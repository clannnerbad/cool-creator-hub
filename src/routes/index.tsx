import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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
import cursorAsset from "@/assets/mixed-cigarette-cursor.gif.asset.json";
import nft1 from "@/assets/nft-1.jpg";
import nft2 from "@/assets/nft-2.jpg";
import nft3 from "@/assets/nft-3.jpg";
import nft4 from "@/assets/nft-4.jpg";
import nft5 from "@/assets/nft-5.jpg";
import nft6 from "@/assets/nft-6.jpg";
const SLIDES = [nft1, nft2, nft3, nft4, nft5, nft6];

const BG_SLIDES = [
  "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/backgroundstory/arcsultans-bg-1.png",
  "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/backgroundstory/arcsultans-bg-2.png",
  "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/backgroundstory/arcsultans-bg-3.png",
  "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/backgroundstory/arcsultans-bg-4.png",
] as const;

const CENTER_PREVIEW = "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/layers/arcsultans_mixed_100.gif";
const CURSOR_IMAGE = cursorAsset.url;
const SPARK_IMAGE = "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/footer/spark-pixel.svg";
const SIDE_FRAMES = [
  { backdrop: "nft-backdrop-ivory", gif: "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/layers/arcsultans_arc_backgound_100.gif" },
  { backdrop: "nft-backdrop-slate", gif: "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/layers/arcsultans_magma_burst_100.gif" },
  { backdrop: "nft-backdrop-sky", gif: "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/layers/arcsultans_solid_sky_blue_100.gif" },
  { backdrop: "nft-backdrop-sand", gif: "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/layers/arcsultans_solid_slate_gray_100.gif" },
] as const;

function BackgroundSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % BG_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden">
      {BG_SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
    </div>
  );
}

function SideGifPreview({ backdrop, gif, slot }: { backdrop: string; gif: string; slot: number }) {
  return (
    <div className={`crt-screen border-4 border-secondary p-1.5 pixel-shadow ${backdrop}`}>
      <img
        src={gif}
        alt={`Animated ARCSultans NFT preview ${slot + 1}`}
        className="aspect-square w-full object-cover mix-blend-multiply [image-rendering:pixelated]"
      />
    </div>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLImageElement>(null);
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    let nextId = 0;

    const moveCursor = (event: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursorRef.current.style.opacity = "1";
    };
    const hideCursor = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };
    const showSpark = (event: MouseEvent) => {
      const id = nextId++;
      setSparks((current) => [...current, { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setSparks((current) => current.filter((spark) => spark.id !== id));
      }, 400);
    };

    window.addEventListener("mousemove", moveCursor);
    document.documentElement.addEventListener("mouseleave", hideCursor);
    window.addEventListener("click", showSpark);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("click", showSpark);
    };
  }, []);

  return (
    <div aria-hidden className="cursor-overlay pointer-events-none fixed inset-0 z-[100]">
      <img
        ref={cursorRef}
        src={CURSOR_IMAGE}
        alt=""
        className="absolute left-0 top-0 h-8 w-8 opacity-0 [image-rendering:pixelated]"
      />
      {sparks.map((spark) => (
        <img
          key={spark.id}
          src={SPARK_IMAGE}
          alt=""
          className="cursor-spark absolute h-6 w-6"
          style={{ left: spark.x, top: spark.y }}
        />
      ))}
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARCSultans — NFT Whitelist Signup" },
      {
        name: "description",
        content:
          "Secure your spot on the ARCSultans whitelist. Mint 16 September 2026 — join the golden dynasty on ARC.",
      },
      { property: "og:title", content: "ARCSultans — NFT Whitelist Signup" },
      {
        property: "og:description",
        content:
          "Secure your spot on the ARCSultans whitelist. Mint 16 September 2026 — join the golden dynasty on ARC.",
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
  const [showWhitelist, setShowWhitelist] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 3500);
    return () => clearInterval(id);
  }, []);

  function handleWhitelistDone() {
    setOpen(false);
    setShowWhitelist(false);
  }

  return (
    <main className="relative h-screen overflow-hidden bg-background selection:bg-accent selection:text-accent-foreground">
      <BackgroundSlideshow />
      <CustomCursor />

      {/* 4 corner GIF preview boxes — anchored to viewport corners (whitelist state only, lg+) */}
      {showWhitelist && (
        <>
          <div className="fixed left-40 top-20 z-10 hidden h-24 w-24 lg:block">
            <SideGifPreview backdrop={SIDE_FRAMES[0].backdrop} gif={SIDE_FRAMES[0].gif} slot={0} />
          </div>
          <div className="fixed bottom-32 left-40 z-10 hidden h-24 w-24 lg:block">
            <SideGifPreview backdrop={SIDE_FRAMES[1].backdrop} gif={SIDE_FRAMES[1].gif} slot={1} />
          </div>
          <div className="fixed right-40 top-20 z-10 hidden h-24 w-24 lg:block">
            <SideGifPreview backdrop={SIDE_FRAMES[2].backdrop} gif={SIDE_FRAMES[2].gif} slot={2} />
          </div>
          <div className="fixed bottom-32 right-40 z-10 hidden h-24 w-24 lg:block">
            <SideGifPreview backdrop={SIDE_FRAMES[3].backdrop} gif={SIDE_FRAMES[3].gif} slot={3} />
          </div>
        </>
      )}

      {/* Content — fills viewport, centered, clears the fixed footer */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-28 pt-5">
        {!showWhitelist ? (
          <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
            <h1 className="font-display text-4xl font-extrabold text-accent sm:text-6xl">ARCSultans</h1>
            <p className="mt-6 max-w-2xl font-display text-sm leading-7 text-foreground sm:text-lg">
              999 Sultans arriving on ARC. Claim your throne before the gates close.
            </p>
            <Button
              size="lg"
              onClick={() => setShowWhitelist(true)}
              className="mt-8 h-16 w-full max-w-sm border-0 border-b-8 border-secondary bg-primary px-4 font-display text-sm font-bold text-primary-foreground shadow-none hover:bg-primary/90 active:translate-y-2 active:border-b-0 sm:text-lg"
            >
              Enter Whitelist
            </Button>
          </section>
        ) : (
          <section className="mx-auto flex w-full max-w-xl items-center justify-center">
            <div className="w-full max-w-md border-4 border-secondary bg-card pixel-shadow">
              <header className="border-b-4 border-secondary bg-muted px-4 py-3 text-center">
                <h1 className="font-display text-2xl font-extrabold text-accent sm:text-3xl">ARCSultans</h1>
                <div className="mt-2 flex items-center justify-center gap-3 font-display text-[8px] text-muted-foreground sm:gap-6 sm:text-[9px]">
                   <span>SUPPLY: 999</span>
                  <span className="text-primary [animation:arcade-blink_1.2s_steps(1)_infinite]">WHITELIST LIVE</span>
                   <span>1 ARC SULTAN</span>
                </div>
              </header>

              <div className="flex flex-col items-center px-4 py-4">
                <div className="crt-screen relative w-full max-w-52 border-4 border-accent bg-background p-2">
                  <img
                    src={CENTER_PREVIEW}
                    alt="Animated ARCSultans NFT collection preview"
                    className="aspect-square w-full object-cover [image-rendering:pixelated]"
                  />
                  <span className="absolute left-2 top-2 z-20 bg-background px-1.5 py-0.5 font-display text-[7px] text-accent">LIVE PREVIEW</span>
                </div>

                <p className="mt-3 text-center font-display text-[9px] leading-4 text-muted-foreground sm:text-[10px]">
                   999 Sultans. 1 Arc Sultan. A golden dynasty on ARC network.
                </p>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="mt-4 h-12 w-full max-w-52 border-0 border-b-8 border-secondary bg-primary px-4 font-display text-xs font-bold text-primary-foreground shadow-none hover:bg-primary/90 active:translate-y-2 active:border-b-0 sm:text-sm"
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
                    <WhitelistForm onDone={handleWhitelistDone} />
                  </DialogContent>
                </Dialog>

                <div className="mt-3 flex gap-2" aria-hidden="true">
                  {SLIDES.map((src, i) => (
                    <span
                      key={src}
                      className={`h-2 transition-all duration-300 ${
                        i === active ? "w-6 bg-accent" : "w-2 bg-secondary"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <footer className="flex items-center justify-between border-t-4 border-secondary bg-muted px-4 py-2 font-display text-[8px] text-muted-foreground">
                <span>MINT: 16.09.2026</span>
                <span className="text-accent">SYSTEM READY</span>
              </footer>
            </div>
          </section>
        )}
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-20 w-full px-6 py-5 sm:px-8">
        <div className="flex w-full items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="font-display text-xl font-extrabold text-white sm:text-2xl">ARCSultans</span>
            <span className="font-display text-[10px] text-gray-400 sm:text-xs">Mint 16 September 2026 · Arc network</span>
          </div>
          <div className="flex items-center gap-3">
            {[
              {
                href: "https://x.com/SaudisARC",
                label: "X (Twitter)",
                icon: "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/footer/x-pixel-outline.svg",
              },
              {
                href: "https://t.me/YOUR_CHANNEL",
                label: "Telegram",
                icon: "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/footer/telegram-pixel.svg",
              },
              {
                href: "https://opensea.io/collection/YOUR_COLLECTION",
                label: "OpenSea",
                icon: "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main/footer/opensea-pixel.svg",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex h-11 w-11 items-center justify-center border border-gray-600 bg-black/40 transition-all duration-200 hover:border-accent hover:scale-105"
              >
                <img src={item.icon} alt={item.label} className="h-6 w-6 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
