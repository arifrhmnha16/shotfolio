"use client";

import { toPng } from "html-to-image";

async function waitForImages(node: HTMLElement) {
  const images = Array.from(node.querySelectorAll("img"));

  await Promise.all(
    images.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete && image.naturalWidth > 0) {
            resolve();
            return;
          }

          const timeout = window.setTimeout(resolve, 2500);
          image.onload = () => {
            window.clearTimeout(timeout);
            resolve();
          };
          image.onerror = () => {
            window.clearTimeout(timeout);
            resolve();
          };
        }),
    ),
  );
}

export async function exportNodeAsPng(
  node: HTMLElement,
  fileName = "shotfolio-cover",
  size?: { width: number; height: number },
) {
  await waitForImages(node);
  const rect = node.getBoundingClientRect();
  const pixelRatio = size && rect.width > 0 ? size.width / rect.width : 2;

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio,
    backgroundColor: "transparent",
  });

  const link = document.createElement("a");
  link.download = `${fileName}.png`;
  link.href = dataUrl;
  link.click();
}
