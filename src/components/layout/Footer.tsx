import React from "react";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="footer-shell py-16 text-center border-t border-border bg-gradient-to-b from-transparent to-accent/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-10">
          <div className="brand-mark flex items-center gap-2 text-xl font-semibold uppercase tracking-[0.16em] text-accent-deep">
            <span className="brand-mark__block px-2 py-1 rounded-md bg-accent text-accent-deep shadow-sm">
              Digital
            </span>
            <span>Degrowth</span>
          </div>
          
          <p className="text-xs text-ink-soft uppercase tracking-[0.2em] max-w-md leading-loose">
            © 2025 Michael Kwet — All tools reclaimed — CC BY 4.0
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {["Manifesto", "People's Tech", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent-deep hover:text-accent transition-colors underline-offset-8 hover:underline decoration-accent/30"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
