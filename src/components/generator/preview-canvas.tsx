"use client";

import type { CSSProperties } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EditorState, ExportSize, ExtractedPalette } from "@/types";

type PreviewCanvasProps = {
  state: EditorState;
  screenshotUrl?: string;
  palette?: ExtractedPalette;
  size: ExportSize;
  previewRef: React.RefObject<HTMLDivElement | null>;
};

const backgroundClasses = {
  "warm-cream": "bg-[linear-gradient(135deg,#F4E7D5,#FFFFFF_46%,#D8C2A5)]",
  "charcoal-gold": "bg-[radial-gradient(circle_at_28%_20%,#4B3824,#111111_46%,#050505)]",
  "editorial-paper": "bg-[linear-gradient(135deg,#F7F2EA,#EFE3D2_55%,#FFFFFF)]",
  "soft-gradient": "bg-[radial-gradient(circle_at_20%_20%,#FFFFFF,#ECD8BF_42%,#B48A57_120%)]",
};

function paletteBackground(state: EditorState, palette?: ExtractedPalette): CSSProperties | undefined {
  if (!palette) return undefined;

  const gradients = {
    "warm-cream": `linear-gradient(135deg, ${palette.muted} 0%, #ffffff 42%, ${palette.primary} 130%)`,
    "charcoal-gold": `radial-gradient(circle at 24% 18%, ${palette.secondary} 0%, #151311 44%, #070707 100%)`,
    "editorial-paper": `linear-gradient(135deg, #fbf8f3 0%, ${palette.muted} 54%, ${palette.secondary} 145%)`,
    "soft-gradient": `radial-gradient(circle at 20% 18%, #ffffff 0%, ${palette.muted} 34%, ${palette.accent} 118%)`,
  };

  return {
    backgroundImage: gradients[state.background],
    boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.38), 0 28px 90px ${palette.primary}33`,
  };
}

function WindowDots() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <span className="h-2 w-2 rounded-full bg-[#D86F59] sm:h-3 sm:w-3" />
      <span className="h-2 w-2 rounded-full bg-[#E2B866] sm:h-3 sm:w-3" />
      <span className="h-2 w-2 rounded-full bg-[#76A879] sm:h-3 sm:w-3" />
    </div>
  );
}

function BrowserChrome({ dark = false, minimal = false }: { dark?: boolean; minimal?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-7 items-center gap-2 border-b px-3 sm:h-10 sm:px-4",
        minimal &&
          "absolute left-3 top-3 z-10 h-auto rounded-full border px-2.5 py-1.5 shadow-lg backdrop-blur-md sm:left-5 sm:top-5 sm:px-3 sm:py-2",
        dark ? "border-white/10 bg-white/8" : "border-[#E8DED1] bg-[#FBF8F3]",
      )}
    >
      <WindowDots />
      {!minimal && (
        <span
          className={cn(
            "ml-3 h-4 flex-1 rounded-full",
            "h-2.5 sm:h-4",
            dark ? "bg-white/10" : "bg-[#E8DED1]/80",
          )}
        />
      )}
    </div>
  );
}

function ScreenshotSurface({ screenshotUrl, dark = false }: { screenshotUrl?: string; dark?: boolean }) {
  if (screenshotUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={screenshotUrl}
        alt="Uploaded website screenshot"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center p-6 text-center sm:p-10",
        dark ? "bg-[#181818] text-white/70" : "bg-[#F7F2EA] text-[#8A7F73]",
      )}
    >
      <ImageIcon className="h-8 w-8 text-[#B48A57] sm:h-12 sm:w-12" />
    </div>
  );
}

function DeviceFrame({
  state,
  screenshotUrl,
  dark,
  size,
}: {
  state: EditorState;
  screenshotUrl?: string;
  dark: boolean;
  size: ExportSize;
}) {
  const isMacbook = state.device === "macbook" || state.template === "macbook-showcase";
  const isMinimal = state.device === "minimal";
  const isFloating = state.device === "floating" || state.template === "floating-card";
  const isProduct = state.template === "gradient-product-shot";
  const isSquare = size.width === size.height;
  const ratio = size.width / size.height;
  const isFourThree = ratio < 1.45 && !isSquare;
  const isWide = ratio > 1.85;

  if (isMacbook) {
    return (
      <div
        className={cn(
          "mx-auto w-full",
          isSquare
            ? "max-w-[84%]"
            : isFourThree
              ? "max-w-[80%]"
              : isWide
                ? "max-w-[88%]"
                : "max-w-[84%]",
        )}
      >
        <div className="rounded-t-[1rem] border border-[#2E2E2E] bg-[#151515] p-[1.3%] shadow-2xl shadow-black/35 sm:rounded-t-[1.6rem]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-white sm:rounded-xl">
            <div className="absolute left-2.5 top-2.5 z-10 rounded-full bg-black/35 px-2.5 py-1.5 backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:py-2">
              <WindowDots />
            </div>
            <ScreenshotSurface screenshotUrl={screenshotUrl} />
          </div>
        </div>
        <div className="mx-auto h-3 w-[92%] rounded-b-[50%] bg-[linear-gradient(180deg,#C9C2B8,#8F877D)] shadow-2xl shadow-black/35 sm:h-7" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mx-auto overflow-hidden border shadow-2xl",
        isSquare
          ? "w-[84%]"
          : isFourThree
            ? "w-[80%]"
            : isWide || isProduct
              ? "w-[88%]"
              : "w-[84%]",
        isMinimal ? "rounded-[0.9rem] sm:rounded-[1.4rem]" : "rounded-[1rem] sm:rounded-[1.7rem]",
        isFloating ? "rotate-[-0.6deg] shadow-[#1F1B16]/25" : "shadow-[#1F1B16]/18",
        dark ? "border-white/10 bg-[#111111]" : "border-white/75 bg-white",
      )}
    >
      <BrowserChrome dark={dark} minimal={isMinimal} />
      <div className="aspect-[16/10]">
        <ScreenshotSurface screenshotUrl={screenshotUrl} dark={dark} />
      </div>
    </div>
  );
}

export function PreviewCanvas({
  state,
  screenshotUrl,
  palette,
  size,
  previewRef,
}: PreviewCanvasProps) {
  const dark =
    state.template === "dark-portfolio" ||
    state.background === "charcoal-gold" ||
    Boolean(palette?.isDark && state.background !== "editorial-paper");
  const editorial = state.template === "old-money-editorial";
  const floating = state.template === "floating-card";
  const dynamicStyle = paletteBackground(state, palette);

  return (
    <section className="min-w-0 rounded-[1.5rem] border border-[#E8DED1] bg-white/92 p-3 shadow-xl shadow-[#4B3824]/8 backdrop-blur sm:rounded-[1.75rem] sm:p-4">
      <div className="mb-4 flex flex-col justify-between gap-3 px-1 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-[#1F1B16]">Live Preview Canvas</p>
          <p className="text-xs text-[#8A7F73]">
            {size.name} - {size.ratio} - {size.width} x {size.height}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {palette && (
            <div className="hidden items-center gap-1.5 sm:flex">
              {[palette.primary, palette.secondary, palette.accent].map((color, index) => (
                <span
                  key={`preview-palette-${index}-${color}`}
                  className="h-5 w-5 rounded-full border border-black/5"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
          <span className="rounded-full border border-[#E8DED1] bg-white px-3 py-1 text-xs font-medium text-[#8A7F73]">
            PNG ready
          </span>
        </div>
      </div>

      <div className="min-w-0 overflow-hidden rounded-[1.15rem] bg-[#111111] p-2 sm:overflow-auto sm:rounded-[1.35rem] sm:p-5">
        <div
          ref={previewRef}
          style={{ aspectRatio: `${size.width} / ${size.height}`, ...dynamicStyle }}
          className={cn(
            "noise relative mx-auto flex w-full max-w-[1040px] overflow-hidden rounded-[1rem] p-[7%] sm:rounded-[1.65rem]",
            !palette && backgroundClasses[state.background],
            dark && "text-white",
          )}
        >
          <div
            className={cn(
              "relative z-10 flex h-full w-full items-center justify-center",
              floating && "translate-y-[0.4%]",
            )}
          >
            <div className="flex h-full w-full items-center justify-center">
              <DeviceFrame
                state={state}
                screenshotUrl={screenshotUrl}
                dark={dark}
                size={size}
              />
            </div>
          </div>

          {editorial && (
            <div className="pointer-events-none absolute inset-[3%] rounded-[1.3rem] border border-[#B48A57]/35" />
          )}
        </div>
      </div>
    </section>
  );
}
