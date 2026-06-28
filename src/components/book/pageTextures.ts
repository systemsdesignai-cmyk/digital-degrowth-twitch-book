import type { PageContent } from "@/data/spreads";

const PAGE_WIDTH = 768;
const PAGE_HEIGHT = 1024;

const stripHtml = (html: string) =>
  html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) => {
  const paragraphs = text.split("\n");
  let cursorY = y;

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let line = "";

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, cursorY);
        line = word;
        cursorY += lineHeight;
      } else {
        line = testLine;
      }
    }

    if (line) {
      ctx.fillText(line, x, cursorY);
      cursorY += lineHeight;
    }

    cursorY += lineHeight * 0.35;
  }
};

const createCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.width = PAGE_WIDTH;
  canvas.height = PAGE_HEIGHT;
  return canvas;
};

export const createContentPageTexture = (content: PageContent): string => {
  const canvas = createCanvas();
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const padding = 72;
  const innerWidth = PAGE_WIDTH - padding * 2;

  const gradient = ctx.createLinearGradient(0, 0, 0, PAGE_HEIGHT);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(1, "#faf6ef");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);

  ctx.fillStyle = "rgba(74, 84, 70, 0.72)";
  ctx.font = "500 22px 'IBM Plex Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(content.header, PAGE_WIDTH / 2, 56);

  ctx.textAlign = "left";

  if (content.kicker) {
    ctx.fillStyle = "#8a6a43";
    ctx.font = "700 20px 'IBM Plex Sans', sans-serif";
    ctx.fillText(content.kicker.toUpperCase(), padding, 120);
  }

  if (content.title) {
    ctx.fillStyle = "#172436";
    ctx.font = "700 54px 'Cormorant Garamond', serif";
    wrapText(ctx, content.title, padding, content.kicker ? 170 : 130, innerWidth, 58);
  }

  ctx.fillStyle = "rgba(23, 36, 54, 0.82)";
  ctx.font = "400 28px 'IBM Plex Sans', sans-serif";
  const bodyY = content.title
    ? content.kicker
      ? 250
      : 210
    : content.kicker
      ? 170
      : 130;
  wrapText(ctx, stripHtml(content.body), padding, bodyY, innerWidth, 38);

  ctx.fillStyle = "rgba(74, 84, 70, 0.65)";
  ctx.font = "500 22px 'IBM Plex Sans', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(content.page, padding, PAGE_HEIGHT - 48);

  return canvas.toDataURL("image/jpeg", 0.92);
};

export const createCoverTexture = (): string => {
  const canvas = createCanvas();
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const gradient = ctx.createLinearGradient(0, 0, PAGE_WIDTH, PAGE_HEIGHT);
  gradient.addColorStop(0, "#1e2b17");
  gradient.addColorStop(1, "#090d0a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 2;
  ctx.strokeRect(36, 36, PAGE_WIDTH - 72, PAGE_HEIGHT - 72);

  ctx.fillStyle = "#f7f3ea";
  ctx.font = "700 34px 'IBM Plex Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("DIGITAL", PAGE_WIDTH / 2, PAGE_HEIGHT * 0.38);
  ctx.fillText("DEGROWTH", PAGE_WIDTH / 2, PAGE_HEIGHT * 0.44);

  ctx.fillStyle = "rgba(247, 243, 234, 0.72)";
  ctx.font = "500 24px 'IBM Plex Sans', sans-serif";
  ctx.fillText("Technology in the Age of Survival", PAGE_WIDTH / 2, PAGE_HEIGHT * 0.52);
  ctx.fillText("Michael Kwet", PAGE_WIDTH / 2, PAGE_HEIGHT * 0.78);

  return canvas.toDataURL("image/jpeg", 0.92);
};

export const createBackCoverTexture = (): string => {
  const canvas = createCanvas();
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const gradient = ctx.createLinearGradient(0, 0, PAGE_WIDTH, PAGE_HEIGHT);
  gradient.addColorStop(0, "#24341d");
  gradient.addColorStop(1, "#11170f");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);

  ctx.fillStyle = "rgba(247, 243, 234, 0.82)";
  ctx.font = "700 42px 'Cormorant Garamond', serif";
  ctx.textAlign = "center";
  wrapText(
    ctx,
    "A call to action for global justice and environmental survival.",
    PAGE_WIDTH / 2,
    PAGE_HEIGHT * 0.45,
    PAGE_WIDTH - 120,
    52
  );

  return canvas.toDataURL("image/jpeg", 0.92);
};
