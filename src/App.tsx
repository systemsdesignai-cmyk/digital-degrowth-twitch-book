import { useEffect, useState } from "react";
import {
  Newspaper,
} from "lucide-react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { BlogPage } from "@/pages/BlogPage";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { StudioPage } from "@/pages/StudioPage";
import { useSiteSettings } from "@/hooks/useSettings";

const BLOG_ARCHIVE_BATCH_SIZE = 2;

const staticSiteSettings = {
  siteTitle: "Digital Degrowth",
  footerText: "© 2025 Michael Kwet — technology in the age of survival.",
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { settings: sanitySiteSettings } = useSiteSettings();

  const siteSettings = sanitySiteSettings || staticSiteSettings;

  const isBlog = location.pathname.startsWith("/blog");
  const isStudio = location.pathname.startsWith("/studio");
  const blogPage = Math.max(
    0,
    (Number(searchParams.get("page") ?? "1") || 1) - 1,
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll to hash on route change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="app-shell min-h-screen">
      {!isStudio && (
        <>
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="ambient-wash absolute inset-0" />
            <div className="paper-grain absolute inset-0" />
          </div>

          <a href="#main-content" className="skip-link">
            Skip to content
          </a>

          <nav
            className={`site-nav ${scrolled ? "site-nav--scrolled" : "site-nav--top"} ${isBlog ? "site-nav--blog" : ""}`}
          >
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center gap-6">
              <Link
                to="/"
                className={`brand-mark text-left ${isBlog ? "brand-mark--blog" : ""}`}
              >
                <span className="brand-mark__block">Digital</span>
                <span>Degrowth</span>
              </Link>

              {!isBlog ? (
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
              ) : (
                <div className="hidden md:flex items-center gap-3 blog-nav-note">
                  <Newspaper size={16} aria-hidden="true" />
                  <span>Editorial archive</span>
                </div>
              )}
            </div>

            {!isBlog ? (
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
            ) : null}
          </nav>
        </>
      )}

      <main id="main-content" className={`main-shell ${isStudio ? "!p-0 !m-0" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/blog"
            element={
              <BlogPage
                currentPage={blogPage}
                pageSize={BLOG_ARCHIVE_BATCH_SIZE}
              />
            }
          />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/studio/*" element={<StudioPage />} />
        </Routes>
      </main>

      {!isStudio && (
        <footer className="footer-shell py-8 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center gap-6">
              <div className="brand-mark">
                <span className="brand-mark__pulse" />
                <span>{siteSettings.siteTitle}</span>
              </div>
              <p className="text-sm text-[color:var(--ink-soft)]">
                {siteSettings.footerText}
              </p>
              <div className="flex gap-8">
                <Link to="/#about" className="footer-link">
                  Manifesto
                </Link>
                <Link to="/blog" className="footer-link">
                  Blog
                </Link>
                <Link to="/#author" className="footer-link">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};


export default App;
