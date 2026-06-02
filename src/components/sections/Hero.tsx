import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const editions = [
    { label: "Amazon", url: "#", icon: <ShoppingCart className="size-4" /> },
    { label: "Takealot", url: "#", icon: <ExternalLink className="size-4" /> },
    { label: "Apple Books", url: "#", icon: <BookOpen className="size-4" /> },
  ];

  return (
    <section
      id="home"
      className="relative py-12 md:py-16 flex items-center overflow-hidden min-h-[80vh]"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center pt-24 md:pt-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8 z-10 text-center md:text-left"
        >
          <div className="space-y-4">
            <span className="eyebrow flex items-center justify-center md:justify-start gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--accent-deep)] before:content-[''] before:w-10 md:before:w-14 before:h-px before:bg-gradient-to-r before:from-accent before:to-transparent">
              New release by Michael Kwet
            </span>
            <h1 className="hero-title text-5xl sm:text-6xl md:text-8xl font-display font-semibold tracking-tighter leading-[0.85] text-ink text-balance">
              Reclaim the <br />
              <span className="hero-outline text-accent/20 [text-stroke:0.7px_rgba(104,164,46,0.8)]">
                future.
              </span>
            </h1>
          </div>
          <p className="hero-copy text-lg md:text-xl text-ink-soft max-w-xl mx-auto md:mx-0 leading-relaxed font-medium text-pretty">
            A manifesto for dismantling digital colonialism and building a
            technology stack that serves the people, not the empire.
          </p>

          <div className="space-y-6 pt-4 flex flex-col items-center md:items-start">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-bold font-display text-ink">
                Buy the book
              </h2>
              <p className="text-[10px] md:text-xs italic text-ink-soft font-medium">
                Available now at these retailers
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {editions.map((edition) => (
                <Button
                  key={edition.label}
                  variant="outline"
                  className="bg-accent text-accent-deep border-accent-strong/20 hover:bg-accent-strong rounded-xl shadow-sm transition-all flex items-center gap-2 h-10 md:h-12 px-4 md:px-6 uppercase tracking-widest text-[9px] md:text-[10px] font-bold"
                >
                  <span aria-hidden="true">{edition.icon}</span>
                  {edition.label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="justify-self-center lg:justify-self-end relative"
        >
          <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <img
            src="/assets/book_logo.png"
            alt="Digital Degrowth Book Cover"
            width={320}
            height={480}
            className="book-cover electric-green-glow w-64 h-96 md:w-80 md:h-[480px] object-cover relative z-10 transition-transform duration-500 hover:-translate-y-4 hover:rotate-1 shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
