export interface BookPageTextures {
  front: string;
  back: string;
}

export const BOOK_COVER_FRONT = "/assets/book-cover/front.webp";
export const BOOK_COVER_BACK = "/assets/book-cover/back.webp";
export const BOOK_COVER_SIDE = "/assets/book-cover/side.webp";

export const PDF_PAGE_COUNT = 14;

export const PDF_PAGES = Array.from(
  { length: PDF_PAGE_COUNT },
  (_, index) => `/assets/dd-pages/${index + 1}.pdf`
);

export const bookPages: BookPageTextures[] = (() => {
  const pages: BookPageTextures[] = [
    {
      front: BOOK_COVER_FRONT,
      back: PDF_PAGES[0],
    },
  ];

  for (let index = 1; index < PDF_PAGES.length - 1; index += 2) {
    pages.push({
      front: PDF_PAGES[index],
      back: PDF_PAGES[index + 1],
    });
  }

  pages.push({
    front: PDF_PAGES[PDF_PAGES.length - 1],
    back: BOOK_COVER_BACK,
  });

  return pages;
})();

export const ALL_PAGE_URLS = [
  ...new Set(bookPages.flatMap((page) => [page.front, page.back])),
];

export const COVER_BOOK_URLS = [
  BOOK_COVER_FRONT,
  BOOK_COVER_BACK,
  BOOK_COVER_SIDE,
];

export const getStaticBookPageTextures = (): BookPageTextures[] =>
  bookPages.map((page, index) => {
    if (index === 0) {
      return {
        front: BOOK_COVER_FRONT,
        back: BOOK_COVER_FRONT,
      };
    }

    if (index === bookPages.length - 1) {
      return {
        front: BOOK_COVER_BACK,
        back: BOOK_COVER_BACK,
      };
    }

    return {
      front: BOOK_COVER_FRONT,
      back: BOOK_COVER_BACK,
    };
  });
