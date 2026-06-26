import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  MessageSquare,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthor } from "@/hooks/useSettings";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isBlog = location.pathname.startsWith("/blog");

  const { author, loading: authorLoading } = useAuthor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`site-nav ${scrolled ? "site-nav--scrolled" : "site-nav--top"} ${isBlog ? "site-nav--blog" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center gap-4">
          <div className="flex-shrink-0 flex justify-start">
            <Link
              to="/"
              className={`brand-mark text-left ${isBlog ? "brand-mark--blog" : ""}`}
              title="Return to Home Page"
              aria-label="Digital Degrowth - Return to Home Page"
            >
              <span className="brand-mark__block">Digital</span>
              <span>Degrowth</span>
            </Link>
          </div>

          <div className="flex-1 flex justify-end items-center gap-8">
            <div className="hidden md:flex items-center gap-8 text-[13px] font-extrabold uppercase tracking-[0.4em]">
              <NavLink
                to="/blog"
                className={({ isActive }) => `nav-link ${isActive ? "nav-link--active" : ""}`}
              >
                Blog
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link ${isActive ? "nav-link--active" : ""}`}
              >
                Contact
              </NavLink>
            </div>

            {/* Desktop Buy Now Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <button
                className="hidden md:block px-6 py-2.5 rounded-xl text-[color:var(--accent)] font-extrabold text-[12px] bg-black hover:bg-[color:var(--accent)] hover:text-black transition-all shadow-md uppercase tracking-[0.15em]"
                onClick={() => {
                  window.open("https://example.com/buy", "_blank");
                }}
              >
                Buy Now
              </button>

              <button
                className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[color:var(--accent)]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { x: "100%" },
              visible: { x: 0 },
            }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-[#f4efe7] shadow-2xl flex flex-col z-[100] overflow-y-auto"
          >
            {/* Header: Branding and Close Button */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-[color:var(--line)]">
              <Link
                to="/"
                className={`brand-mark text-left text-[#1a2416] text-xl`}
                title="Return to Home Page"
                aria-label="Digital Degrowth - Return to Home Page"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="brand-mark__block">Digital</span>
                <span>Degrowth</span>
              </Link>
              <button
                className="p-2 rounded-md text-[#1a2416] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[color:var(--accent)]"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-8 text-[#1a2416] font-extrabold text-3xl md:text-4xl py-8 font-display">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `transition-colors ${isActive ? "text-[color:var(--accent-warm)]" : "hover:text-[color:var(--accent-strong)]"}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[color:var(--accent-warm)] scale-100 opacity-100"
                          : "bg-transparent scale-0 opacity-0"
                      }`}
                    />
                    Blog
                  </span>
                )}
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `transition-colors ${isActive ? "text-[color:var(--accent-warm)]" : "hover:text-[color:var(--accent-strong)]"}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[color:var(--accent-warm)] scale-100 opacity-100"
                          : "bg-transparent scale-0 opacity-0"
                      }`}
                    />
                    Contact
                  </span>
                )}
              </NavLink>
            </div>

            {/* Separator */}
            <div className="border-t border-[color:var(--line)] my-4" />

            {/* Social Media Links */}
            <div className="flex justify-center flex-wrap gap-6 py-4">
              {authorLoading ? (
                <div className="text-gray-600">Loading social links...</div>
              ) : (
                <>
                  {author?.twitter && (
                    <a
                      href={author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
                      aria-label={`Follow ${author.name} on Twitter`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Twitter size={24} />
                    </a>
                  )}
                  {author?.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
                      aria-label={`Connect with ${author.name} on LinkedIn`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Linkedin size={24} />
                    </a>
                  )}
                  {author?.instagram && (
                    <a
                      href={author.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
                      aria-label={`Follow ${author.name} on Instagram`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Instagram size={24} />
                    </a>
                  )}
                  {author?.facebook && (
                    <a
                      href={author.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
                      aria-label={`Follow ${author.name} on Facebook`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Facebook size={24} />
                    </a>
                  )}
                  {author?.bluesky && (
                    <a
                      href={author.bluesky}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
                      aria-label={`Follow ${author.name} on Bluesky`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <MessageSquare size={24} />
                    </a>
                  )}
                  {author?.website && (
                    <a
                      href={author.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
                      aria-label={`Visit ${author.name}'s website`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Globe size={24} />
                    </a>
                  )}
                </>
              )}
            </div>

            {/* Buy Now Button */}
            <div className="py-6 px-6">
              <button
                className="w-full py-4 rounded-xl text-[color:var(--accent)] font-extrabold text-[12px] bg-black hover:bg-[color:var(--accent)] hover:text-black transition-all shadow-lg uppercase tracking-[0.15em]"
                onClick={() => {
                  window.open("https://example.com/buy", "_blank");
                  setMobileMenuOpen(false);
                }}
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
