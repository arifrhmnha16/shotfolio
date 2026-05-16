export type TemplateId =
  | "minimal-browser"
  | "dark-portfolio"
  | "old-money-editorial"
  | "floating-card"
  | "macbook-showcase"
  | "gradient-product-shot";

export type BackgroundStyleId =
  | "warm-cream"
  | "charcoal-gold"
  | "editorial-paper"
  | "soft-gradient";

export type DeviceMockupId = "browser" | "macbook" | "floating" | "minimal";

export type ExportSizeId =
  | "portfolio-cover"
  | "github-readme"
  | "linkedin-square"
  | "behance-cover"
  | "dribbble-shot";

export type Template = {
  id: TemplateId;
  name: string;
  description: string;
};

export type SelectOption<T extends string = string> = {
  id: T;
  name: string;
  description?: string;
};

export type ExportSize = SelectOption<ExportSizeId> & {
  width: number;
  height: number;
  ratio: string;
};

export type ExtractedPalette = {
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  isDark: boolean;
};

export type EditorState = {
  title: string;
  description: string;
  techStack: string;
  template: TemplateId;
  background: BackgroundStyleId;
  device: DeviceMockupId;
  exportSize: ExportSizeId;
};
