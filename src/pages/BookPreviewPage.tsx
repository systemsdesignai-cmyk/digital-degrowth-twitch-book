import { useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useAtom } from "jotai";
import { bookPages, PDF_PAGE_COUNT } from "@/components/book/bookPages";
import { BookExperience } from "@/components/book/Experience";
import { pageAtom } from "@/components/book/bookState";
import styles from "./BookPreviewPage.module.css";

const getPageLabel = (page: number) => {
  if (page <= 0) return "Cover";
  if (page >= bookPages.length) return "Back Cover";

  const startPdf = page * 2 - 1;
  const endPdf = Math.min(page * 2, PDF_PAGE_COUNT);

  if (startPdf === endPdf) {
    return `Page ${startPdf} of ${PDF_PAGE_COUNT}`;
  }

  return `Pages ${startPdf}–${endPdf} of ${PDF_PAGE_COUNT}`;
};

export const BookPreviewPage = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    setPage(0);
    return () => {
      setPage(0);
    };
  }, [setPage]);

  useEffect(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    const originalHtmlOverflow = htmlEl.style.overflow;
    const originalHtmlHeight = htmlEl.style.height;
    const originalBodyOverflow = bodyEl.style.overflow;
    const originalBodyHeight = bodyEl.style.height;
    const originalBodyOverscroll = bodyEl.style.overscrollBehavior;

    htmlEl.style.overflow = "hidden";
    htmlEl.style.height = "100%";
    bodyEl.style.overflow = "hidden";
    bodyEl.style.height = "100%";
    bodyEl.style.overscrollBehavior = "none";

    return () => {
      htmlEl.style.overflow = originalHtmlOverflow;
      htmlEl.style.height = originalHtmlHeight;
      bodyEl.style.overflow = originalBodyOverflow;
      bodyEl.style.height = originalBodyHeight;
      bodyEl.style.overscrollBehavior = originalBodyOverscroll;
    };
  }, []);

  const progressPercent = (page / bookPages.length) * 100;

  const goToSpread = useCallback(
    (direction: number) => {
      setPage((currentPage) => {
        const nextPage = Math.min(
          bookPages.length,
          Math.max(0, currentPage + direction)
        );
        return nextPage;
      });
    },
    [setPage]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToSpread(-1);
      }
      if (event.key === "ArrowRight") {
        goToSpread(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToSpread]);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const diffX = event.changedTouches[0].clientX - touchStartX.current;
    const diffY = event.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      goToSpread(diffX > 0 ? -1 : 1);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const pageLabel = getPageLabel(page);

  return (
    <main
      className={`${styles["preview-shell"]} app-shell`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles["preview-background"]} aria-hidden="true">
        <div className="ambient-wash absolute inset-0" />
        <div className="paper-grain absolute inset-0" />
      </div>

      <div className={styles["canvas-shell"]} aria-label="Digital Degrowth book preview">
        <Loader />
        <Canvas
          shadows
          gl={{ alpha: true, antialias: true }}
          camera={{
            position: [-0.5, 1, window.innerWidth > 800 ? 4 : 7],
            fov: 45,
          }}
        >
          <group position-y={0}>
            <Suspense fallback={null}>
              <BookExperience />
            </Suspense>
          </group>
        </Canvas>
      </div>

      <div className={styles["preview-overlay"]}>
        <div className={styles["preview-header"]}>
          <nav className={styles["preview-nav"]}>
            <Link
              to="/"
              className="brand-mark text-left"
              title="Return to Home Page"
              aria-label="Digital Degrowth - Return to Home Page"
            >
              <span className="brand-mark__block">Digital</span>
              <span>Degrowth</span>
            </Link>
            <div className={styles["nav-actions"]}>
              <Link to="/">Exit Preview</Link>
            </div>
          </nav>

          <div className={styles["book-meta"]} aria-live="polite">
            <span id="page-label">{pageLabel}</span>
            <span id="chapter-label">Digital Degrowth</span>
          </div>
        </div>

        <div className={styles["reader-controls"]} aria-label="Preview controls">
          <button
            type="button"
            className={styles["icon-button"]}
            data-action="prev"
            onClick={() => goToSpread(-1)}
            aria-label="Previous page"
            disabled={page <= 0}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 5 8.5 12l7 7" />
            </svg>
          </button>

          <div className={styles["progress-track"]} aria-hidden="true">
            <span
              className={styles["progress-bar"]}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <button
            type="button"
            className={styles["icon-button"]}
            data-action="next"
            onClick={() => goToSpread(1)}
            aria-label="Next page"
            disabled={page >= bookPages.length}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m8.5 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
};
