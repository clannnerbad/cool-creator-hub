import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const signupSchema = z.object({
  walletAddress: z
    .string()
    .trim()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid ARC wallet address"),
  email: z.string().trim().email("Invalid email address").max(255),
  xUsername: z.string().trim().min(1, "X username is required").max(50),
});

export type SignupResult =
  | { ok: true }
  | { ok: false; field: "walletAddress" | "email" | "xUsername" | "form"; message: string };

export const submitWhitelistSignup = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<SignupResult> => {
    const parsed = signupSchema.safeParse(data);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return {
        ok: false,
        field: (issue?.path[0] as "walletAddress" | "email" | "xUsername") ?? "form",
        message: issue?.message ?? "Invalid submission",
      };
    }

    const { walletAddress, email, xUsername } = parsed.data;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing, error: lookupError } = await supabaseAdmin
      .from("whitelist_signups")
      .select("wallet_address, email")
      .or(`wallet_address.ilike.${walletAddress},email.ilike.${email}`);

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
      return { ok: false, field: "email", message: "This email is already whitelisted." };
    }

    const { error: insertError } = await supabaseAdmin.from("whitelist_signups").insert({
      wallet_address: walletAddress,
      email,
      x_username: xUsername.replace(/^@/, ""),
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return {
          ok: false,
          field: "form",
          message: "This wallet address or email is already whitelisted.",
        };
      }
      console.error("whitelist insert failed", insertError);
      return { ok: false, field: "form", message: "Something went wrong. Please try again." };
    }

    try {
      const { sendWhitelistConfirmation } = await import("./whitelist-email.server");
      await sendWhitelistConfirmation(email);
    } catch (err) {
      console.error("whitelist confirmation email failed", err);
    }

    return { ok: true };
  });
