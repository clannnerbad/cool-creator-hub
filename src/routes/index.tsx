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
import arcBackgroundAsset from "@/assets/arcsultans-arc-backgound-100.gif.asset.json";
import magmaBurstAsset from "@/assets/arcsultans-magma-burst-100.gif.asset.json";
import mixedAsset from "@/assets/arcsultans-mixed-100.gif.asset.json";
import solidSkyBlueAsset from "@/assets/arcsultans-solid-sky-blue-100.gif.asset.json";
import solidSlateGrayAsset from "@/assets/arcsultans-solid-slate-gray-100.gif.asset.json";

const SLIDES = [nft1, nft2, nft3, nft4, nft5, nft6];

const CENTER_PREVIEW = mixedAsset.url;
const SIDE_FRAMES = [
  { backdrop: "nft-backdrop-ivory", gif: arcBackgroundAsset.url },
  { backdrop: "nft-backdrop-slate", gif: magmaBurstAsset.url },
  { backdrop: "nft-backdrop-sky", gif: solidSkyBlueAsset.url },
  { backdrop: "nft-backdrop-sand", gif: solidSlateGrayAsset.url },
] as const;

function SideGifPreview({ backdrop, gif, slot }: { backdrop: string; gif: string; slot: number }) {
  return (
    <div className={`crt-screen border-4 border-secondary p-2 pixel-shadow ${backdrop}`}>
      <img
        src={gif}
        alt={`Animated ArcSultans NFT preview ${slot + 1}`}
        className="aspect-square w-full object-cover mix-blend-multiply [image-rendering:pixelated]"
      />
    </div>
  );
}

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
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-5 selection:bg-accent selection:text-accent-foreground md:px-8 md:py-8">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl items-center justify-center md:min-h-[calc(100vh-4rem)]">
        <div className="absolute inset-y-10 left-0 hidden w-40 flex-col justify-around lg:flex">
          {SIDE_FRAMES.slice(0, 2).map((frame, slot) => (
            <SideGifPreview key={frame.backdrop} backdrop={frame.backdrop} gif={frame.gif} slot={slot} />
          ))}
        </div>
        <div className="absolute inset-y-10 right-0 hidden w-40 flex-col justify-around lg:flex">
          {SIDE_FRAMES.slice(2).map((frame, index) => (
            <SideGifPreview key={frame.backdrop} backdrop={frame.backdrop} gif={frame.gif} slot={index + 2} />
          ))}
        </div>

        <div className="w-full max-w-xl border-8 border-secondary bg-card pixel-shadow">
          <header className="border-b-8 border-secondary bg-muted px-4 py-5 text-center sm:px-6">
            <h1 className="font-display text-3xl font-extrabold text-accent sm:text-5xl">ARCSULTANS</h1>
            <div className="mt-4 flex items-center justify-center gap-4 font-display text-[9px] text-muted-foreground sm:gap-8 sm:text-[10px]">
              <span>CREDITS: 01</span>
              <span className="text-primary [animation:arcade-blink_1.2s_steps(1)_infinite]">WHITELIST LIVE</span>
              <span>ARC MODE</span>
            </div>
          </header>

          <div className="flex flex-col items-center px-5 py-6 sm:px-8">
            <div className="crt-screen relative w-full max-w-80 border-4 border-accent bg-background p-2">
              <img
                src={CENTER_PREVIEW}
                alt="Animated ArcSultans NFT collection preview"
                className="aspect-square w-full object-cover [image-rendering:pixelated]"
              />
              <span className="absolute left-3 top-3 z-20 bg-background px-2 py-1 font-display text-[8px] text-accent">LIVE PREVIEW</span>
            </div>

            <p className="mt-5 text-center font-display text-[10px] leading-5 text-muted-foreground sm:text-xs">
              A GOLDEN DYNASTY OF 1/1 SOVEREIGNS ON ARC
            </p>

            <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
                   className="mt-6 h-16 w-full max-w-sm border-0 border-b-8 border-secondary bg-primary px-4 font-display text-sm font-bold text-primary-foreground shadow-none hover:bg-primary/90 active:translate-y-2 active:border-b-0 sm:text-lg"
            >
                   ENTER WHITELIST
            </Button>
          </DialogTrigger>
              <DialogContent className="max-h-[92vh] overflow-y-auto border-4 border-accent bg-popover p-5 pixel-shadow sm:max-w-md sm:rounded-none sm:p-7">
            <DialogHeader>
                   <DialogTitle className="font-display text-lg text-accent">JOIN WHITELIST</DialogTitle>
                   <DialogDescription className="font-display text-[10px] leading-5">
                     COMPLETE ALL FIELDS TO SECURE YOUR SPOT
               </DialogDescription>
            </DialogHeader>
            <WhitelistForm />
          </DialogContent>
        </Dialog>

            <div className="mt-5 flex gap-2" aria-hidden="true">
          {SLIDES.map((src, i) => (
            <span
               key={src}
                   className={`h-2 transition-all duration-300 ${
                     i === active ? "w-8 bg-accent" : "w-2 bg-secondary"
               }`}
             />
           ))}
         </div>
           </div>

          <footer className="flex items-center justify-between border-t-8 border-secondary bg-muted px-5 py-3 font-display text-[8px] text-muted-foreground">
            <span>MINT: 16.09.2026</span>
            <span className="text-accent">SYSTEM READY</span>
          </footer>
        </div>
      </section>

      <footer className="relative z-10 mx-auto mt-4 flex max-w-6xl items-center justify-center gap-6 pb-4">
        <a
          href="https://t.me/YOUR_CHANNEL"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          className="opacity-80 transition-all duration-200 hover:opacity-100 hover:scale-110"
        >
          <img src="/footer/telegram.png" alt="Telegram" className="h-8 w-auto" />
        </a>
        <a
          href="https://x.com/SaudisARC"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="opacity-80 transition-all duration-200 hover:opacity-100 hover:scale-110"
        >
          <img src="/footer/x-white.png" alt="X (Twitter)" className="h-8 w-auto" />
        </a>
        <a
          href="https://opensea.io/collection/YOUR_COLLECTION"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="OpenSea"
          className="opacity-80 transition-all duration-200 hover:opacity-100 hover:scale-110"
        >
          <img src="/footer/opensea-white.svg" alt="OpenSea" className="h-8 w-auto" />
        </a>
      </footer>
    </main>
  );
}
