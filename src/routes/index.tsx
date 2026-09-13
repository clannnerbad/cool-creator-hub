import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WhitelistForm } from "@/components/WhitelistForm";
import nft1 from "@/assets/nft-1.jpg";
import nft2 from "@/assets/nft-2.jpg";
import nft3 from "@/assets/nft-3.jpg";
import nft4 from "@/assets/nft-4.jpg";
import nft5 from "@/assets/nft-5.jpg";
import nft6 from "@/assets/nft-6.jpg";

const SLIDES = [nft1, nft2, nft3, nft4, nft5, nft6];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ArcSultans — NFT Whitelist Signup" },
      {
        name: "description",
        content:
          "Secure your spot on the ArcSultans whitelist. Mint 16 September 2026 — join the golden dynasty on ARC.",
      },
      { property: "og:title", content: "ArcSultans — NFT Whitelist Signup" },
      {
        property: "og:description",
        content:
          "Secure your spot on the ArcSultans whitelist. Mint 16 September 2026 — join the golden dynasty on ARC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Rotating NFT preview slideshow */}
      <div className="absolute inset-0">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            width={1024}
            height={1024}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--background)_100%)]" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <p className="mb-5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-[0.25em] text-primary uppercase">
          Mint · 16 September 2026
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl">
          Arc<span className="text-primary">Sultans</span>
        </h1>

        <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
          A golden dynasty of 1/1 sovereigns on ARC. Claim your place before the gates close.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="mt-10 h-14 px-10 text-base font-semibold shadow-[0_0_40px_-8px_var(--primary)]"
            >
              Enter Whitelist
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Join the ArcSultans whitelist</DialogTitle>
              <DialogDescription>
                Fill in your details and confirm the task to secure your spot.
              </DialogDescription>
            </DialogHeader>
            <WhitelistForm />
          </DialogContent>
        </Dialog>

        <div className="mt-12 flex gap-2">
          {SLIDES.map((src, i) => (
            <span
              key={src}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? "w-8 bg-primary" : "w-1.5 bg-primary/30"
              }`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
