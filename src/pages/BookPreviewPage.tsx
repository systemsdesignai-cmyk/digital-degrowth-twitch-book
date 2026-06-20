import { useState, useEffect, useRef, useCallback } from "react";
import { spreads, type Spread } from "@/data/spreads";
import styles from "./BookPreviewPage.module.css";

const PAGE_TURN_DURATION = 920;

export const BookPreviewPage = () => {
  const [activeSpread, setActiveSpread] = useState(0);
  const [state, setState] = useState<"idle" | "turning-forward" | "turning-back">("idle");
  const turnTimerRef = useRef<NodeJS.Timeout>();

  const currentSpread = spreads[activeSpread];
  const totalSpreads = spreads.length;
  const progressPercent = ((activeSpread + 1) / totalSpreads) * 100;

  const goToSpread = useCallback((direction: number) => {
    setState((currentState) => {
      if (currentState !== "idle") return currentState;
      
      const nextState = direction > 0 ? "turning-forward" : "turning-back";
      
      if (turnTimerRef.current) {
        clearTimeout(turnTimerRef.current);
      }

      turnTimerRef.current = setTimeout(() => {
        setActiveSpread((currentSpread) => {
          const nextSpread = (currentSpread + direction + spreads.length) % spreads.length;
          return nextSpread;
        });
        setState("idle");
      }, PAGE_TURN_DURATION + 40);
      
      return nextState;
    });
  }, []);

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
      if (turnTimerRef.current) clearTimeout(turnTimerRef.current);
    };
  }, [goToSpread]);

  const renderHTML = (html: string) => {
    return { __html: html };
  };

  return (
    <main className={styles["preview-shell"]}>
      <section className={styles["hero-grid"]} aria-labelledby="preview-title">
        <div className={styles["book-stage"]} aria-label="Digital Degrowth book preview">
          <div className={styles["book-meta"]} aria-live="polite">
            <span id="page-label">
              Spread {activeSpread + 1} of {totalSpreads}
            </span>
            <span id="chapter-label">{currentSpread.chapter}</span>
          </div>

          <div 
            className={styles["book"]}
            data-state={state}
          >
            <div className={styles["book-cover"]} aria-hidden="true">
              <img src="/assets/book_logo.png" alt="" />
            </div>

            <article className={styles["spread"]} aria-live="polite">
              <section className={`${styles["paper"]} ${styles["page-left"]}`}>
                <div className={styles["page-header"]}>
                  {currentSpread.left.header}
                </div>
                <p className={styles["page-kicker"]}>
                  {currentSpread.left.kicker}
                </p>
                <h2>{currentSpread.left.title}</h2>
                <p
                  dangerouslySetInnerHTML={renderHTML(currentSpread.left.body)}
                />
                <div className={styles["page-footer"]}>
                  {currentSpread.left.page}
                </div>
              </section>

              <section className={`${styles["paper"]} ${styles["page-right"]}`}>
                <div className={styles["page-header"]}>
                  {currentSpread.right.header}
                </div>
                <p className={styles["page-kicker"]}>
                  {currentSpread.right.kicker}
                </p>
                <h2>{currentSpread.right.title}</h2>
                <p
                  dangerouslySetInnerHTML={renderHTML(currentSpread.right.body)}
                />
                <div className={styles["page-footer"]}>
                  {currentSpread.right.page}
                </div>
              </section>
            </article>

            <div className={styles["flip-sheet"]} aria-hidden="true">
              <section className={`${styles["paper"]} ${styles["flip-face"]} ${styles["flip-front"]}`}>
                <div className={styles["flip-content"]}>
                  <p className={styles["page-kicker"]}></p>
                  <h2></h2>
                  <p></p>
                </div>
              </section>
              <section className={`${styles["paper"]} ${styles["flip-face"]} ${styles["flip-back"]}`}>
                <div className={styles["flip-content"]}>
                  <p className={styles["page-kicker"]}></p>
                  <h2></h2>
                  <p></p>
                </div>
              </section>
            </div>

            <div className={styles["book-spine"]} aria-hidden="true" />
          </div>

          <div className={styles["reader-controls"]} aria-label="Preview controls">
            <button
              type="button"
              className={styles["icon-button"]}
              data-action="prev"
              onClick={() => goToSpread(-1)}
              aria-label="Previous spread"
              disabled={state !== "idle"}
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
              aria-label="Next spread"
              disabled={state !== "idle"}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m8.5 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
