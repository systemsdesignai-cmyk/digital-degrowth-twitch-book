import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  MessageSquare,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthor } from "@/hooks/useSettings"; // Import useAuthor hook

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isBlog = location.pathname.startsWith("/blog");

  const { author, loading: authorLoading } = useAuthor(); // Call useAuthor hook


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
    <nav
      className={`site-nav ${scrolled ? "site-nav--scrolled" : "site-nav--top"} ${isBlog ? "site-nav--blog" : ""}`}
    >
              <div className="max-w-6xl mx-auto px-6 flex justify-between items-center gap-6">
                <div className="flex-1 flex justify-start">
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
      
                <div className="hidden md:flex flex-1 justify-center gap-8 text-[11px] font-bold uppercase tracking-[0.4em]">
                  <Link
                    to="/blog"
                    className="nav-link"
                  >
                    Blog
                  </Link>
                  <Link
                    to="/contact"
                    className="nav-link"
                  >
                    Contact
                  </Link>
                </div>
      
                <div className="flex-1 flex justify-end items-center gap-4">
                  {/* Desktop Buy Now Button */}
                  <button
                    className="hidden md:block px-6 py-2.5 rounded-xl text-[color:var(--accent)] font-bold text-[10px] bg-black hover:bg-[color:var(--accent)] hover:text-black transition-all shadow-md uppercase tracking-[0.15em]"
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
                                                                                  className="md:hidden fixed inset-0 bg-[color:var(--bg)] rounded-lg shadow-lg flex flex-col z-50 overflow-y-auto"
                                                                                >
                                                                                  {/* Header: Branding and Close Button */}
                                                                                  <div className="flex justify-between items-center px-6 py-4 border-b border-[color:var(--line)]">
                                                                                    <Link
                                                                                      to="/"
                                                                                      className={`brand-mark text-left text-[color:var(--ink)] text-xl`}
                                                                                      title="Return to Home Page"
                                                                                      aria-label="Digital Degrowth - Return to Home Page"
                                                                                      onClick={() => setMobileMenuOpen(false)}
                                                                                    >
                                                                                      <span className="brand-mark__block">Digital</span>
                                                                                      <span>Degrowth</span>
                                                                                    </Link>
                                                                                    <button
                                                                                      className="p-2 rounded-md text-[color:var(--ink)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[color:var(--accent)]"
                                                                                      onClick={() => setMobileMenuOpen(false)}
                                                                                      aria-label="Close menu"
                                                                                    >
                                                                                      <X size={24} />
                                                                                    </button>
                                                                                  </div>
                                                      
                                                                                  {/* Main Navigation Links */}
                                                                                  <div className="flex-1 flex flex-col items-center justify-center gap-8 text-[color:var(--ink)] font-bold text-3xl md:text-4xl py-8 font-display">
                                                                                    <Link
                                                                                      to="/blog"
                                                                                      className="hover:text-[color:var(--accent-strong)] transition-colors"
                                                                                      onClick={() => setMobileMenuOpen(false)}
                                                                                    >
                                                                                      Blog
                                                                                    </Link>
                                                                                    <Link
                                                                                      to="/contact"
                                                                                      className="hover:text-[color:var(--accent-strong)] transition-colors"
                                                                                      onClick={() => setMobileMenuOpen(false)}
                                                                                    >
                                                                                      Contact
                                                                                    </Link>
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
                                                                                      className="w-full py-4 rounded-xl text-[color:var(--accent)] font-bold text-[10px] bg-black hover:bg-[color:var(--accent)] hover:text-black transition-all shadow-lg uppercase tracking-[0.15em]"
                                                                                      onClick={() => {
                                                                                        // Placeholder for "Buy Now" URL
                                                                                        window.open("https://example.com/buy", "_blank");
                                                                                        setMobileMenuOpen(false);
                                                                                      }}
                                                                                    >
                                                                                      Buy Now
                                                                                    </button>
                                                                                  </div>
                                                                                </motion.div>
                        )}
                      </AnimatePresence>    </nav>
  );
};
