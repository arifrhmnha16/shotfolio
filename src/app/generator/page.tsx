"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditorPanel } from "@/components/generator/editor-panel";
import { PreviewCanvas } from "@/components/generator/preview-canvas";
import { Button } from "@/components/ui/button";
import { DEFAULT_EDITOR_STATE, EXPORT_SIZES, STORAGE_KEY } from "@/lib/constants";
import { extractPaletteFromFile } from "@/lib/extract-colors";
import type { EditorState, ExtractedPalette } from "@/types";

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function GeneratorPage() {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<EditorState>(DEFAULT_EDITOR_STATE);
  const [screenshotUrl, setScreenshotUrl] = useState<string>();
  const [palette, setPalette] = useState<ExtractedPalette>();

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsedState = { ...DEFAULT_EDITOR_STATE, ...JSON.parse(saved) };
      queueMicrotask(() => setState(parsedState));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const selectedSize = useMemo(
    () => EXPORT_SIZES.find((size) => size.id === state.exportSize) ?? EXPORT_SIZES[0],
    [state.exportSize],
  );

  function handleChange<K extends keyof EditorState>(key: K, value: EditorState[K]) {
    setState((current) => ({ ...current, [key]: value }));
  }

  async function handleUpload(file: File) {
    try {
      const [dataUrl, extractedPalette] = await Promise.all([
        readFileAsDataUrl(file),
        extractPaletteFromFile(file),
      ]);
      setScreenshotUrl(dataUrl);
      setPalette(extractedPalette);
    } catch {
      setScreenshotUrl(undefined);
      setPalette(undefined);
    }
  }

  function handleReset() {
    setState(DEFAULT_EDITOR_STATE);
    setScreenshotUrl(undefined);
    setPalette(undefined);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F7F2EA_0%,#FBF8F3_48%,#F1E7DA_100%)] text-[#1F1B16]">
      <header className="border-b border-[#E8DED1] bg-[#F7F2EA]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between px-3 sm:h-20 sm:px-8">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft size={18} />
              Shotfolio
            </Link>
          </Button>
          <div className="hidden items-center gap-3 rounded-full border border-[#E8DED1] bg-white/65 px-4 py-2 text-sm text-[#8A7F73] shadow-sm sm:flex">
            {palette ? (
              <>
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: palette.accent }}
                />
                Colors synced from screenshot
              </>
            ) : (
              "Portfolio cover generator"
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1500px] gap-4 px-3 py-4 sm:gap-6 sm:px-8 sm:py-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        <EditorPanel
          state={state}
          previewRef={previewRef}
          selectedSize={selectedSize}
          palette={palette}
          onChange={handleChange}
          onUpload={handleUpload}
          onReset={handleReset}
        />
        <PreviewCanvas
          state={state}
          screenshotUrl={screenshotUrl}
          palette={palette}
          size={selectedSize}
          previewRef={previewRef}
        />
      </main>
    </div>
  );
}
