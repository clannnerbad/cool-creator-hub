import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const signupSchema = z.object({
  walletAddress: z
    .string()
    .trim()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid ARC wallet address"),
  xUsername: z.string().trim().min(1, "X username is required").max(50),
  xCommentLink: z
    .string()
    .trim()
    .regex(
      /^https:\/\/(x\.com|twitter\.com)\/\S+$/,
      "Link must start with https://x.com/ or https://twitter.com/",
    )
    .max(500),
});

export type SignupResult =
  | { ok: true }
  | { ok: false; field: "walletAddress" | "xUsername" | "xCommentLink" | "form"; message: string };

export const submitWhitelistSignup = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<SignupResult> => {
    const parsed = signupSchema.safeParse(data);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return {
        ok: false,
        field: (issue?.path[0] as "walletAddress" | "xUsername" | "xCommentLink") ?? "form",
        message: issue?.message ?? "Invalid submission",
      };
    }

    const { walletAddress, xUsername, xCommentLink } = parsed.data;
    const username = xUsername.replace(/^@/, "");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing, error: lookupError } = await supabaseAdmin
      .from("whitelist_signups")
      .select("wallet_address, x_username")
      .or(`wallet_address.ilike.${walletAddress},x_username.ilike.${username}`);

    if (lookupError) {
      console.error("whitelist lookup failed", lookupError);
      return { ok: false, field: "form", message: "Something went wrong. Please try again." };
    }

    if (existing && existing.length > 0) {
      const walletTaken = existing.some(
        (row) => row.wallet_address.toLowerCase() === walletAddress.toLowerCase(),
      );
      if (walletTaken) {
        return {
          ok: false,
          field: "walletAddress",
          message: "This wallet address is already whitelisted.",
        };
      }
      return { ok: false, field: "xUsername", message: "This X username is already whitelisted." };
    }

    const { error: insertError } = await supabaseAdmin.from("whitelist_signups").insert({
      wallet_address: walletAddress,
      x_username: username,
      x_comment_link: xCommentLink,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return {
          ok: false,
          field: "form",
          message: "This wallet address or X username is already whitelisted.",
        };
      }
      console.error("whitelist insert failed", insertError);
      return { ok: false, field: "form", message: "Something went wrong. Please try again." };
    }

    return { ok: true };
  });
