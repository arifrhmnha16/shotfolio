"use client";

import { Palette, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BACKGROUND_STYLES, DEVICE_MOCKUPS, EXPORT_SIZES } from "@/lib/constants";
import { TEMPLATES } from "@/lib/templates";
import type {
  BackgroundStyleId,
  DeviceMockupId,
  EditorState,
  ExportSizeId,
  ExtractedPalette,
  TemplateId,
} from "@/types";
import { ExportButton } from "./export-button";
import { UploadZone } from "./upload-zone";

type EditorPanelProps = {
  state: EditorState;
  previewRef: React.RefObject<HTMLDivElement | null>;
  selectedSize: (typeof EXPORT_SIZES)[number];
  palette?: ExtractedPalette;
  onChange: <K extends keyof EditorState>(key: K, value: EditorState[K]) => void;
  onUpload: (file: File) => void;
  onReset: () => void;
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.25rem] border border-[#E8DED1] bg-[#FBF8F3]/65 p-3 sm:rounded-[1.35rem] sm:p-4">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#8A7F73]">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#1F1B16]">{label}</span>
      {children}
    </label>
  );
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; name: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="h-11 w-full rounded-2xl border border-[#E8DED1] bg-white px-3 text-xs text-[#1F1B16] shadow-sm outline-none transition focus:border-[#B48A57] focus:ring-4 focus:ring-[#B48A57]/10 sm:px-4 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {"width" in option && "height" in option && "ratio" in option
              ? `${option.name} - ${option.ratio} (${option.width}x${option.height})`
              : option.name}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function EditorPanel({
  state,
  previewRef,
  selectedSize,
  palette,
  onChange,
  onUpload,
  onReset,
}: EditorPanelProps) {
  return (
    <aside className="rounded-[1.5rem] border border-[#E8DED1] bg-white/92 p-3 shadow-xl shadow-[#4B3824]/8 backdrop-blur sm:rounded-[1.75rem] sm:p-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-auto">
      <div className="mb-4 flex items-center gap-3 px-1">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F7F2EA] text-[#B48A57]">
          <Palette size={20} />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#1F1B16]">
            Cover Studio
          </h1>
          <p className="text-sm text-[#8A7F73]">Upload, style, and export your cover.</p>
        </div>
      </div>

      <div className="space-y-4">
        <Section title="Screenshot">
          <UploadZone onUpload={onUpload} />
          {palette && (
            <div className="flex items-center justify-between rounded-2xl border border-[#E8DED1] bg-white px-3 py-3">
              <span className="text-xs font-medium text-[#8A7F73]">Auto palette</span>
              <div className="flex gap-1.5">
                {[palette.primary, palette.secondary, palette.accent, palette.muted].map(
                  (color, index) => (
                    <span
                      key={`editor-palette-${index}-${color}`}
                      className="h-6 w-6 rounded-full border border-black/5 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ),
                )}
              </div>
            </div>
          )}
        </Section>

        <Section title="Style">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <SelectField<TemplateId>
              label="Template"
              value={state.template}
              options={TEMPLATES}
              onChange={(value) => onChange("template", value)}
            />
            <SelectField<BackgroundStyleId>
              label="Background style"
              value={state.background}
              options={BACKGROUND_STYLES}
              onChange={(value) => onChange("background", value)}
            />
            <SelectField<DeviceMockupId>
              label="Device mockup"
              value={state.device}
              options={DEVICE_MOCKUPS}
              onChange={(value) => onChange("device", value)}
            />
            <SelectField<ExportSizeId>
              label="Export size"
              value={state.exportSize}
              options={EXPORT_SIZES}
              onChange={(value) => onChange("exportSize", value)}
            />
          </div>
        </Section>

        <div className="grid gap-3 rounded-[1.25rem] border border-[#E8DED1] bg-white p-3 sm:grid-cols-2 sm:rounded-[1.35rem]">
          <ExportButton targetRef={previewRef} size={selectedSize} />
          <Button type="button" variant="outline" onClick={onReset}>
            <RotateCcw size={17} />
            Reset
          </Button>
        </div>
      </div>
    </aside>
  );
}
