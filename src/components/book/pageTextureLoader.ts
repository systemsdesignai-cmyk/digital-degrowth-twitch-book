import { Loader, CanvasTexture, SRGBColorSpace, Texture } from "three";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const RENDER_WIDTH = 1536;
const BOOK_PAGE_ASPECT = 1.28 / 1.71;
const RENDER_HEIGHT = Math.round(RENDER_WIDTH / BOOK_PAGE_ASPECT);
const PDF_RENDER_WIDTH = 2048;
const PAGE_CONTENT_PATTERN = /\/assets\/dd-pages\//;
const PAPER_COLOR = "#fffdf9";
const INK_LUMINANCE_THRESHOLD = 200;

const fallbackTextures = new Map<string, Texture>();

interface InkBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const shouldProcessPageContent = (url: string) => PAGE_CONTENT_PATTERN.test(url);

const getLuminance = (red: number, green: number, blue: number) =>
  0.299 * red + 0.587 * green + 0.114 * blue;

const detectInkBounds = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): InkBounds | null => {
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let inkPixels = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const luminance = getLuminance(data[index], data[index + 1], data[index + 2]);
      if (luminance < INK_LUMINANCE_THRESHOLD) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        inkPixels += 1;
      }
    }
  }

  const minArea = width * height * 0.002;
  if (inkPixels < minArea) {
    return null;
  }

  return { minX, minY, maxX, maxY };
};

const drawCanvasContained = (
  context: CanvasRenderingContext2D,
  sourceCanvas: HTMLCanvasElement,
  maxWidth: number,
  maxHeight: number
) => {
  const scale = Math.min(
    maxWidth / sourceCanvas.width,
    maxHeight / sourceCanvas.height
  );
  const drawWidth = sourceCanvas.width * scale;
  const drawHeight = sourceCanvas.height * scale;
  const drawX = (RENDER_WIDTH - drawWidth) / 2;
  const drawY = (RENDER_HEIGHT - drawHeight) / 2;
  context.drawImage(sourceCanvas, drawX, drawY, drawWidth, drawHeight);
};

export const reframePageContent = (sourceCanvas: HTMLCanvasElement): HTMLCanvasElement => {
  const sourceContext = sourceCanvas.getContext("2d");
  if (!sourceContext) {
    return sourceCanvas;
  }

  const bounds = detectInkBounds(
    sourceContext,
    sourceCanvas.width,
    sourceCanvas.height
  );

  const output = document.createElement("canvas");
  output.width = RENDER_WIDTH;
  output.height = RENDER_HEIGHT;
  const context = output.getContext("2d", { alpha: false });
  if (!context) {
    return sourceCanvas;
  }

  context.fillStyle = PAPER_COLOR;
  context.fillRect(0, 0, output.width, output.height);

  const maxWidth = RENDER_WIDTH * 0.92;
  const maxHeight = RENDER_HEIGHT * 0.92;

  if (!bounds) {
    drawCanvasContained(context, sourceCanvas, maxWidth, maxHeight);
    return output;
  }

  const contentWidth = bounds.maxX - bounds.minX;
  const contentHeight = bounds.maxY - bounds.minY;
  const padX = contentWidth * 0.06;
  const padY = contentHeight * 0.06;
  const cropX = Math.max(0, bounds.minX - padX);
  const cropY = Math.max(0, bounds.minY - padY);
  const cropWidth = Math.min(sourceCanvas.width - cropX, contentWidth + padX * 2);
  const cropHeight = Math.min(sourceCanvas.height - cropY, contentHeight + padY * 2);
  const scale = Math.min(maxWidth / cropWidth, maxHeight / cropHeight);
  const drawWidth = cropWidth * scale;
  const drawHeight = cropHeight * scale;
  const drawX = (RENDER_WIDTH - drawWidth) / 2;
  const drawY = (RENDER_HEIGHT - drawHeight) / 2;

  context.drawImage(
    sourceCanvas,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );

  return output;
};

export const sharpenPageInk = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const imageData = context.getImageData(0, 0, width, height);
  const source = imageData.data;
  const output = new Uint8ClampedArray(source);
  const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const centerIndex = (y * width + x) * 4;
      const centerLuminance = getLuminance(
        source[centerIndex],
        source[centerIndex + 1],
        source[centerIndex + 2]
      );

      if (centerLuminance >= 242) {
        continue;
      }

      for (let channel = 0; channel < 3; channel += 1) {
        let sum = 0;
        let kernelIndex = 0;

        for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
          for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
            const sampleIndex = ((y + offsetY) * width + (x + offsetX)) * 4 + channel;
            sum += source[sampleIndex] * kernel[kernelIndex];
            kernelIndex += 1;
          }
        }

        output[centerIndex + channel] = Math.min(255, Math.max(0, sum));
      }
    }
  }

  context.putImageData(new ImageData(output, width, height), 0, 0);
};

export const darkenPageInk = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const paperThreshold = 248;
  const inkInputMax = 225;
  const minInkLuminance = 10;
  const maxInkLuminance = 36;
  const paperRed = 255;
  const paperGreen = 253;
  const paperBlue = 249;

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const luminance = getLuminance(red, green, blue);

    if (luminance >= paperThreshold) {
      data[index] = paperRed;
      data[index + 1] = paperGreen;
      data[index + 2] = paperBlue;
      continue;
    }

    if (luminance >= inkInputMax) {
      const blend = (luminance - inkInputMax) / (paperThreshold - inkInputMax);
      data[index] = Math.round(paperRed * blend + red * (1 - blend));
      data[index + 1] = Math.round(paperGreen * blend + green * (1 - blend));
      data[index + 2] = Math.round(paperBlue * blend + blue * (1 - blend));
      continue;
    }

    const inkAmount = 1 - luminance / inkInputMax;
    const newLuminance =
      maxInkLuminance - inkAmount * inkAmount * (maxInkLuminance - minInkLuminance);
    const ratio = newLuminance / Math.max(luminance, 1);

    data[index] = Math.round(Math.min(255, red * ratio));
    data[index + 1] = Math.round(Math.min(255, green * ratio));
    data[index + 2] = Math.round(Math.min(255, blue * ratio));
  }

  context.putImageData(imageData, 0, 0);
};

const processPageContentCanvas = (
  sourceCanvas: HTMLCanvasElement,
  url: string
): HTMLCanvasElement => {
  if (!shouldProcessPageContent(url)) {
    return sourceCanvas;
  }

  const reframedCanvas = reframePageContent(sourceCanvas);
  const context = reframedCanvas.getContext("2d");
  if (!context) {
    return reframedCanvas;
  }

  sharpenPageInk(context, reframedCanvas.width, reframedCanvas.height);
  darkenPageInk(context, reframedCanvas.width, reframedCanvas.height);
  return reframedCanvas;
};

const canvasToTexture = (canvas: HTMLCanvasElement) => {
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.flipY = true;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
};

const getPageLabelFromUrl = (url: string) => {
  const match = url.match(/\/(\d+)\.(pdf|jpg|webp)$/);
  return match ? `Page ${match[1]}` : "Page unavailable";
};

export const createFallbackPageTexture = (url: string): Texture => {
  const cached = fallbackTextures.get(url);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = RENDER_WIDTH;
  canvas.height = RENDER_HEIGHT;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = PAPER_COLOR;
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
  const scale = PDF_RENDER_WIDTH / baseViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) {
    throw new Error("Unable to create canvas context for PDF rendering.");
  }

  context.fillStyle = PAPER_COLOR;
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({
    canvasContext: context,
    viewport,
    canvas,
  }).promise;

  const processedCanvas = processPageContentCanvas(canvas, url);
  return canvasToTexture(processedCanvas);
}

const loadImageToTexture = (url: string) =>
  new Promise<Texture>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) {
        reject(new Error("Unable to create canvas context for image rendering."));
        return;
      }

      context.drawImage(image, 0, 0);
      const processedCanvas = processPageContentCanvas(canvas, url);
      resolve(canvasToTexture(processedCanvas));
    };
    image.onerror = () => reject(new Error(`Failed to load image ${url}`));
    image.src = url;
  });

export class PageTextureLoader extends Loader<Texture> {
  load(
    url: string,
    onLoad: (texture: Texture) => void,
    _onProgress?: (event: ProgressEvent<EventTarget>) => void,
    _onError?: (error: unknown) => void
  ) {
    if (url.endsWith(".pdf")) {
      renderPdfToTexture(url)
        .then(onLoad)
        .catch((error) => {
          console.warn(`Failed to render PDF texture for ${url}`, error);
          onLoad(createFallbackPageTexture(url));
        });
    } else {
      loadImageToTexture(url)
        .then(onLoad)
        .catch((error) => {
          console.warn(`Failed to load texture for ${url}`, error);
          onLoad(createFallbackPageTexture(url));
        });
    }

    return this;
  }
}

export const pageTextureLoader = new PageTextureLoader();

export const isPdfTexture = (url: string) => url.endsWith(".pdf");
