import type { BackgroundStyleId, DeviceMockupId, EditorState, ExportSize } from "@/types";

export const DEFAULT_EDITOR_STATE: EditorState = {
  title: "Studio-grade developer portfolio",
  description:
    "A refined project cover built from a live product screenshot, tuned for portfolio launches and case studies.",
  techStack: "Next.js, TypeScript, Tailwind CSS",
  template: "minimal-browser",
  background: "warm-cream",
  device: "browser",
  exportSize: "portfolio-cover",
};

export const EXPORT_SIZES: ExportSize[] = [
  { id: "portfolio-cover", name: "Portfolio Cover", width: 1600, height: 900, ratio: "16:9" },
  { id: "github-readme", name: "GitHub README", width: 1200, height: 630, ratio: "1.91:1" },
  { id: "linkedin-square", name: "LinkedIn Square", width: 1200, height: 1200, ratio: "1:1" },
  { id: "behance-cover", name: "Behance Cover", width: 1400, height: 788, ratio: "16:9" },
  { id: "dribbble-shot", name: "Dribbble Shot", width: 1600, height: 1200, ratio: "4:3" },
];

export const BACKGROUND_STYLES: {
  id: BackgroundStyleId;
  name: string;
  description: string;
}[] = [
  { id: "warm-cream", name: "Warm Cream", description: "Soft old-money canvas" },
  { id: "charcoal-gold", name: "Charcoal Gold", description: "Deep preview room" },
  { id: "editorial-paper", name: "Editorial Paper", description: "Classic paper tone" },
  { id: "soft-gradient", name: "Soft Gradient", description: "Subtle launch glow" },
];

export const DEVICE_MOCKUPS: {
  id: DeviceMockupId;
  name: string;
  description: string;
}[] = [
  { id: "browser", name: "Browser Window", description: "Clean desktop frame" },
  { id: "macbook", name: "MacBook Showcase", description: "Laptop-style presentation" },
  { id: "floating", name: "Floating Card", description: "Elevated product shot" },
  { id: "minimal", name: "Minimal Frame", description: "Simple rounded crop" },
];

export const STORAGE_KEY = "shotfolio.editor.v1";
