import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isBlog = location.pathname.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`site-nav ${scrolled ? "site-nav--scrolled" : "site-nav--top"} ${isBlog ? "site-nav--blog" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center gap-6">
        <Link
          to="/"
          className={`brand-mark text-left ${isBlog ? "brand-mark--blog" : ""}`}
          title="Return to Home Page"
          aria-label="Digital Degrowth - Return to Home Page"
        >
          <span className="brand-mark__block">Digital</span>
          <span>Degrowth</span>
        </Link>

        <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.4em]">
          {["About", "Praise", "News", "Author"].map((item) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              className="nav-link"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="mobile-nav-strip md:hidden">
        {["About", "Praise", "News", "Author"].map((item) => (
          <Link
            key={item}
            to={`/#${item.toLowerCase()}`}
            className="mobile-nav-chip"
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
};
