const spreads = [
  {
    chapter: "Introduction",
    left: {
      kicker: "Preview note",
      title: "PDF content placeholder",
      body: "The final manuscript pages can be inserted here as text, images, or rendered PDF canvases once supplied.",
      page: "i",
    },
    right: {
      kicker: "Reader mode",
      title: "Built for sample spreads",
      body: "The layout keeps generous margins, clear page numbering, and a simple interaction model for a future PDF.",
      page: "ii",
    },
  },
  {
    chapter: "The argument",
    left: {
      kicker: "Opening frame",
      title: "Technology in the age of survival",
      body: "A preview spread can carry a chapter opening, pull quote, or short editorial summary before the full pages are available.",
      page: "1",
    },
    right: {
      kicker: "Sample excerpt",
      title: "A slower digital future",
      body: "Use this space for the first real excerpt from the PDF, or replace the whole paper surface with an image capture of the page.",
      page: "2",
    },
  },
  {
    chapter: "Reader notes",
    left: {
      kicker: "Coming soon",
      title: "PDF upload ready",
      body: "When the PDF arrives, each spread can be mapped to exported page images, keeping the same controls and surrounding theme.",
      page: "3",
    },
    right: {
      kicker: "Content plan",
      title: "Excerpts, citations, and chapter art",
      body: "The preview can support short excerpts now and a fuller page-by-page reader later without changing the public URL.",
      page: "4",
    },
  },
  {
    chapter: "Next steps",
    left: {
      kicker: "Implementation",
      title: "Static today, extensible later",
      body: "This standalone version avoids framework dependencies, so it can live in public/3d-book while the main React site stays unchanged.",
      page: "5",
    },
    right: {
      kicker: "Final spread",
      title: "Send the PDF when ready",
      body: "Once the source file is available, this screen can be wired to real PDF pages, downloads, or gated sample chapters.",
      page: "6",
    },
  },
];

const book = document.querySelector(".book");
const pageLabel = document.querySelector("#page-label");
const chapterLabel = document.querySelector("#chapter-label");
const progressBar = document.querySelector("#progress-bar");
const leftPage = document.querySelector(".page-left");
const rightPage = document.querySelector(".page-right");
const flipSheet = document.querySelector(".flip-sheet");
const flipFront = document.querySelector(".flip-front");
const flipBack = document.querySelector(".flip-back");
const pageTurnDuration = 920;

const fields = {
  leftKicker: document.querySelector("#left-kicker"),
  leftTitle: document.querySelector("#left-title"),
  leftBody: document.querySelector("#left-body"),
  rightKicker: document.querySelector("#right-kicker"),
  rightTitle: document.querySelector("#right-title"),
  rightBody: document.querySelector("#right-body"),
};

let activeSpread = 0;
let turnTimer;
let isTurning = false;

function preventPageScroll(event) {
  event.preventDefault();
}

window.addEventListener("wheel", preventPageScroll, { passive: false });
window.addEventListener("touchmove", preventPageScroll, { passive: false });

function setText(element, text) {
  if (element) {
    element.textContent = text;
  }
}

function renderPage(pageElement, page, pageFields) {
  setText(pageFields.kicker, page.kicker);
  setText(pageFields.title, page.title);
  setText(pageFields.body, page.body);
  pageElement.dataset.page = page.page;
}

function renderSpread(index) {
  const spread = spreads[index];

  setText(pageLabel, `Spread ${index + 1} of ${spreads.length}`);
  setText(chapterLabel, spread.chapter);
  renderPage(leftPage, spread.left, {
    kicker: fields.leftKicker,
    title: fields.leftTitle,
    body: fields.leftBody,
  });
  renderPage(rightPage, spread.right, {
    kicker: fields.rightKicker,
    title: fields.rightTitle,
    body: fields.rightBody,
  });
  progressBar.style.width = `${((index + 1) / spreads.length) * 100}%`;
}

function renderTurnSpread(direction, currentSpread, nextSpread) {
  if (direction > 0) {
    renderPage(leftPage, currentSpread.left, {
      kicker: fields.leftKicker,
      title: fields.leftTitle,
      body: fields.leftBody,
    });
    renderPage(rightPage, nextSpread.right, {
      kicker: fields.rightKicker,
      title: fields.rightTitle,
      body: fields.rightBody,
    });
    return;
  }

  renderPage(leftPage, nextSpread.left, {
    kicker: fields.leftKicker,
    title: fields.leftTitle,
    body: fields.leftBody,
  });
  renderPage(rightPage, currentSpread.right, {
    kicker: fields.rightKicker,
    title: fields.rightTitle,
    body: fields.rightBody,
  });
}

function renderFlipFace(face, page) {
  if (!face || !page) return;

  const kicker = face.querySelector(".page-kicker");
  const title = face.querySelector("h2");
  const body = face.querySelector("p:not(.page-kicker)");

  setText(kicker, page.kicker);
  setText(title, page.title);
  setText(body, page.body);
  face.dataset.page = page.page;
}

function prepareFlip(direction, currentSpread, nextSpread) {
  if (!flipSheet) return;

  if (direction > 0) {
    renderFlipFace(flipFront, currentSpread.right);
    renderFlipFace(flipBack, nextSpread.left);
    flipSheet.dataset.turn = "forward";
    return;
  }

  renderFlipFace(flipFront, currentSpread.left);
  renderFlipFace(flipBack, nextSpread.right);
  flipSheet.dataset.turn = "back";
}

function goToSpread(direction) {
  if (isTurning) return;

  isTurning = true;
  const nextSpread = (activeSpread + direction + spreads.length) % spreads.length;
  const currentSpread = spreads[activeSpread];
  const destinationSpread = spreads[nextSpread];

  prepareFlip(direction, currentSpread, destinationSpread);
  renderTurnSpread(direction, currentSpread, destinationSpread);
  book.dataset.state = direction > 0 ? "turning-forward" : "turning-back";
  window.clearTimeout(turnTimer);

  turnTimer = window.setTimeout(() => {
    activeSpread = nextSpread;
    renderSpread(activeSpread);
    book.dataset.state = "idle";
    if (flipSheet) {
      delete flipSheet.dataset.turn;
    }
    isTurning = false;
  }, pageTurnDuration + 40);
}

document.querySelectorAll("[data-action]").forEach((control) => {
  control.addEventListener("click", () => {
    const action = control.getAttribute("data-action");
    goToSpread(action === "prev" ? -1 : 1);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    goToSpread(-1);
  }

  if (event.key === "ArrowRight") {
    goToSpread(1);
  }
});

renderSpread(activeSpread);
