import { Loader, CanvasTexture, SRGBColorSpace, Texture, TextureLoader } from "three";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const RENDER_WIDTH = 1024;

const fallbackTextures = new Map<string, Texture>();

const getPageLabelFromUrl = (url: string) => {
  const match = url.match(/\/(\d+)\.(pdf|jpg|webp)$/);
  return match ? `Page ${match[1]}` : "Page unavailable";
};

export const createFallbackPageTexture = (url: string): Texture => {
  const cached = fallbackTextures.get(url);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = "#fffdf9";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#4a5446";
    context.font = "600 28px 'IBM Plex Sans', sans-serif";
    context.textAlign = "center";
    context.fillText(getPageLabelFromUrl(url), canvas.width / 2, canvas.height / 2);
    context.font = "400 20px 'IBM Plex Sans', sans-serif";
    context.fillText("Unable to load page", canvas.width / 2, canvas.height / 2 + 40);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  fallbackTextures.set(url, texture);
  return texture;
};

export async function renderPdfToTexture(url: string): Promise<Texture> {
  const pdf = await getDocument({ url }).promise;
  const page = await pdf.getPage(1);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = RENDER_WIDTH / baseViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) {
    throw new Error("Unable to create canvas context for PDF rendering.");
  }

  context.fillStyle = "#fffdf9";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({
    canvasContext: context,
    viewport,
    canvas,
  }).promise;

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.flipY = true;
  texture.needsUpdate = true;
  return texture;
}

export class PageTextureLoader extends Loader<Texture> {
  load(
    url: string,
    onLoad: (texture: Texture) => void,
    onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (error: unknown) => void
  ) {
    if (url.endsWith(".pdf")) {
      renderPdfToTexture(url)
        .then(onLoad)
        .catch((error) => {
          console.warn(`Failed to render PDF texture for ${url}`, error);
          onLoad(createFallbackPageTexture(url));
        });
    } else {
      new TextureLoader(this.manager).load(
        url,
        (texture) => {
          texture.colorSpace = SRGBColorSpace;
          onLoad(texture);
        },
        onProgress,
        (error) => {
          console.warn(`Failed to load texture for ${url}`, error);
          onLoad(createFallbackPageTexture(url));
        }
      );
    }

    return this;
  }
}

export const pageTextureLoader = new PageTextureLoader();

export const isPdfTexture = (url: string) => url.endsWith(".pdf");
