"use client";

import { useRef, useState } from "react";
import { ImageIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

type UploadZoneProps = {
  onUpload: (file: File) => void;
};

export function UploadZone({ onUpload }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file?: File) {
    if (file && file.type.startsWith("image/")) {
      onUpload(file);
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          inputRef.current?.click();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFile(event.dataTransfer.files[0]);
      }}
      className={cn(
        "group flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#D8C9B8] bg-[#FBF8F3] p-4 text-center transition sm:min-h-36 sm:p-6",
        isDragging && "border-[#B48A57] bg-[#F4E8D8]",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#B48A57] shadow-sm sm:mb-4 sm:h-12 sm:w-12">
        {isDragging ? <ImageIcon size={22} /> : <Upload size={22} />}
      </div>
      <p className="text-sm font-semibold text-[#1F1B16]">
        Drop a website screenshot here
      </p>
      <p className="mt-2 max-w-xs text-xs leading-5 text-[#8A7F73]">
        PNG, JPG, or WebP works best. The image previews instantly in the cover.
      </p>
    </div>
  );
}
