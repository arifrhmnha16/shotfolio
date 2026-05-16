"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportNodeAsPng } from "@/lib/export-image";
import type { ExportSize } from "@/types";

type ExportButtonProps = {
  targetRef: React.RefObject<HTMLDivElement | null>;
  size: ExportSize;
};

export function ExportButton({ targetRef, size }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string>();

  async function handleExport() {
    if (!targetRef.current) return;

    setIsExporting(true);
    setError(undefined);
    try {
      await exportNodeAsPng(targetRef.current, "shotfolio-cover", {
        width: size.width,
        height: size.height,
      });
    } catch {
      setError("Export gagal. Coba upload ulang screenshot lalu download lagi.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        variant="accent"
        className="w-full"
      >
        <Download size={18} />
        {isExporting ? "Exporting..." : "Download PNG"}
      </Button>
      {error && <p className="text-xs leading-5 text-[#9A4F3D]">{error}</p>}
    </div>
  );
}
