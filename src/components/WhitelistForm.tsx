import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, ExternalLink, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitWhitelistSignup } from "@/lib/whitelist.functions";

const WALLET_RE = /^0x[a-fA-F0-9]{40}$/;
const X_LINK_RE = /^https:\/\/(x\.com|twitter\.com)\/\S+$/;

type Errors = Partial<Record<"walletAddress" | "xUsername" | "xCommentLink" | "form", string>>;

export function WhitelistForm({ onDone }: { onDone?: () => void }) {
  const submit = useServerFn(submitWhitelistSignup);

  const [walletAddress, setWalletAddress] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [xCommentLink, setXCommentLink] = useState("");
  const [followed, setFollowed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const walletValid = WALLET_RE.test(walletAddress.trim());
  const usernameValid = xUsername.trim().length > 0;
  const linkValid = X_LINK_RE.test(xCommentLink.trim());
  const canSubmit = walletValid && usernameValid && linkValid && followed && !submitting;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setErrors({});
    try {
      const result = await submit({
        data: {
          walletAddress: walletAddress.trim(),
          xUsername: xUsername.trim(),
          xCommentLink: xCommentLink.trim(),
        },
      });
      if (result.ok) {
        setDone(true);
        onDone?.();
      } else {
        setErrors({ [result.field]: result.message });
      }
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center border-4 border-accent bg-accent/10">
          <Check className="h-8 w-8 text-primary" strokeWidth={3} />
        </div>
        <h3 className="font-display text-lg font-bold text-accent">YOU'RE WHITELISTED!</h3>
        <p className="font-display text-[10px] text-muted-foreground">SEE YOU AT MINT — 16.09.2026.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="wallet" className="font-display text-[10px] text-foreground">ARC WALLET ADDRESS</Label>
        <Input
          id="wallet"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="0x…"
          autoComplete="off"
          spellCheck={false}
          maxLength={42}
          className="h-11 border-2 bg-background font-mono text-sm focus-visible:ring-2"
        />
        {walletAddress.length > 0 && !walletValid && (
          <p className="text-xs text-destructive">
            Must start with 0x followed by 40 hex characters.
          </p>
        )}
        {errors.walletAddress && <p className="text-xs text-destructive">{errors.walletAddress}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="x-username" className="font-display text-[10px] text-foreground">X USERNAME</Label>
        <Input
          id="x-username"
          value={xUsername}
          onChange={(e) => setXUsername(e.target.value)}
          placeholder="@yourhandle"
          maxLength={50}
          className="h-11 border-2 bg-background font-mono text-sm focus-visible:ring-2"
        />
        {errors.xUsername && <p className="text-xs text-destructive">{errors.xUsername}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="x-comment-link" className="font-display text-[10px] text-foreground">X COMMENT LINK</Label>
        <Input
          id="x-comment-link"
          value={xCommentLink}
          onChange={(e) => setXCommentLink(e.target.value)}
          placeholder="https://x.com/.../status/..."
          autoComplete="off"
          spellCheck={false}
          maxLength={500}
          className="h-11 border-2 bg-background font-mono text-sm focus-visible:ring-2"
        />
        {xCommentLink.length > 0 && !linkValid && (
          <p className="text-xs text-destructive">
            Must start with https://x.com/ or https://twitter.com/
          </p>
        )}
        {errors.xCommentLink && <p className="text-xs text-destructive">{errors.xCommentLink}</p>}
      </div>

      <div className="border-2 border-secondary bg-muted p-4">
        <a
          href="https://x.com/SaudisARC"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-display text-[10px] font-bold text-accent hover:text-primary"
        >
          Follow @SaudisARC on X
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <div className="mt-3 flex items-start gap-2.5">
          <Checkbox
            id="followed"
            checked={followed}
            onCheckedChange={(v) => setFollowed(v === true)}
            className="mt-0.5"
          />
          <Label htmlFor="followed" className="font-display text-[9px] leading-5 font-normal">
            I'VE FOLLOWED @SAUDISARC ON X
          </Label>
        </div>
      </div>

      {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}

      <Button type="submit" disabled={!canSubmit} className="h-12 w-full border-b-4 border-secondary font-display text-xs font-bold shadow-none active:translate-y-1 active:border-b-0">
        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </form>
  );
}
