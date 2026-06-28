import { spreads } from "@/data/spreads";
import { createContentPageTexture } from "@/components/book/pageTextures";

export interface BookPageTextures {
  front: string;
  back: string;
}

export const BOOK_COVER_FRONT = "/assets/book-cover/front.webp";
export const BOOK_COVER_BACK = "/assets/book-cover/back.webp";
export const BOOK_COVER_SIDE = "/assets/book-cover/side.webp";

const contentTextures = spreads.flatMap((spread) => [
  createContentPageTexture(spread.left),
  createContentPageTexture(spread.right),
]);

export const bookPages: BookPageTextures[] = (() => {
  const pages: BookPageTextures[] = [
    {
      front: BOOK_COVER_FRONT,
      back: contentTextures[0],
    },
  ];

  for (let index = 1; index < contentTextures.length - 1; index += 2) {
    pages.push({
      front: contentTextures[index],
      back: contentTextures[index + 1],
    });
  }

  pages.push({
    front: contentTextures[contentTextures.length - 1],
    back: BOOK_COVER_BACK,
  });

  return pages;
})();
