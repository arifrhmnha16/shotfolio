"use client";

import type { ExtractedPalette } from "@/types";

type Rgb = { r: number; g: number; b: number; count: number };

function toHex({ r, g, b }: Pick<Rgb, "r" | "g" | "b">) {
  return `#${[r, g, b]
    .map((value) => Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0"))
    .join("")}`;
}

function luminance(color: Pick<Rgb, "r" | "g" | "b">) {
  return (0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b) / 255;
}

function saturation({ r, g, b }: Pick<Rgb, "r" | "g" | "b">) {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  if (max === min) return 0;
  return (max - min) / (1 - Math.abs(max + min - 1));
}

function soften(color: Pick<Rgb, "r" | "g" | "b">, amount = 0.82) {
  return {
    r: Math.round(color.r + (255 - color.r) * amount),
    g: Math.round(color.g + (255 - color.g) * amount),
    b: Math.round(color.b + (255 - color.b) * amount),
  };
}

function average(colors: Rgb[]) {
  const total = colors.reduce((sum, color) => sum + color.count, 0) || 1;

  return colors.reduce(
    (acc, color) => ({
      r: acc.r + color.r * color.count / total,
      g: acc.g + color.g * color.count / total,
      b: acc.b + color.b * color.count / total,
    }),
    { r: 0, g: 0, b: 0 },
  );
}

export async function extractPaletteFromFile(file: File): Promise<ExtractedPalette> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const size = 96;
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new Error("Canvas is not available");
  }

  context.drawImage(bitmap, 0, 0, size, size);
  bitmap.close();

  const { data } = context.getImageData(0, 0, size, size);
  const buckets = new Map<string, Rgb>();
  const all: Rgb[] = [];

  for (let index = 0; index < data.length; index += 16) {
    const alpha = data[index + 3];
    if (alpha < 160) continue;

    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const lum = luminance({ r, g, b });

    all.push({ r, g, b, count: 1 });
    if (lum < 0.08 || lum > 0.94) continue;

    const key = [r, g, b].map((value) => Math.round(value / 24) * 24).join("-");
    const existing = buckets.get(key);

    if (existing) {
      existing.r = Math.round((existing.r * existing.count + r) / (existing.count + 1));
      existing.g = Math.round((existing.g * existing.count + g) / (existing.count + 1));
      existing.b = Math.round((existing.b * existing.count + b) / (existing.count + 1));
      existing.count += 1;
    } else {
      buckets.set(key, { r, g, b, count: 1 });
    }
  }

  const colors = [...buckets.values()].sort((a, b) => {
    const scoreA = a.count * (0.72 + saturation(a));
    const scoreB = b.count * (0.72 + saturation(b));
    return scoreB - scoreA;
  });

  const primary = colors[0] ?? { r: 180, g: 138, b: 87, count: 1 };
  const secondary =
    colors.find((color) => Math.abs(luminance(color) - luminance(primary)) > 0.18) ??
    colors[1] ??
    { r: 31, g: 27, b: 22, count: 1 };
  const accent =
    colors.find((color) => saturation(color) > 0.2 && luminance(color) > 0.18) ?? primary;
  const avg = average(all);

  return {
    primary: toHex(primary),
    secondary: toHex(secondary),
    accent: toHex(accent),
    muted: toHex(soften(avg)),
    isDark: luminance(avg) < 0.43,
  };
}
