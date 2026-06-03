import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Github,
  Globe,
  Newspaper,
  ExternalLink,
  ShoppingCart,
  Twitter,
  User,
  ArrowRight,
} from "lucide-react";
import { Routes, Route, Link, useLocation, useSearchParams } from "react-router-dom";
import { BlogPage } from "@/components/blog/BlogPage";
import { BlogPostPage } from "@/components/blog/BlogPostPage";
import { formatArticleDate, latestArticles } from "@/data/articles";

const BLOG_ARCHIVE_BATCH_SIZE = 2;

const citations = [
  "/assets/qoutes/kwet1.jpg",
  "/assets/qoutes/kwet2.jpg",
  "/assets/qoutes/kwet3.jpg",
  "/assets/qoutes/kwet4.jpg",
  "/assets/qoutes/kwet5.jpg",
];

const BuySection = () => {
  const editions = [
    {
      label: "Amazon",
      icon: <ShoppingCart size={16} aria-hidden="true" />,
    },
    {
      label: "Takealot",
      icon: <ExternalLink size={16} aria-hidden="true" />,
    },
    {
      label: "Apple Books",
      icon: <BookOpen size={16} aria-hidden="true" />,
    },
  ];

  return (
    <div id="buy" className="flex flex-col items-start space-y-6 pt-8 animate-fade">
      <div className="space-y-1">
        <h2 className="text-3xl md:text-4xl">
          Buy the book
        </h2>
        <p className="text-xs italic text-[color:var(--ink-soft)] font-medium">
          Available now at these retailers
        </p>
      </div>

      <div className="flex flex-wrap gap-3 w-full max-w-lg">
        {editions.map((edition) => (
          <button
            key={edition.label}
            type="button"
            className="button-primary !py-3 !px-6 !rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-2"
          >
            {edition.icon}
            {edition.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const HomePage = ({ citationIndex, nextCitation, prevCitation, setCitationIndex }: any) => (
  <>
    <section
      id="home"
      className="relative py-16 md:py-16 flex items-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center pt-16">
        <div className="space-y-6 z-10">
          <div className="space-y-2">
            <span className="eyebrow">New release by Michael Kwet</span>
            <h1 className="hero-title text-5xl md:text-7xl">
              Reclaim the <br />
              <span className="hero-outline">future.</span>
            </h1>
          </div>
          <p className="hero-copy max-w-xl">
            A manifesto for dismantling digital colonialism and building a
            technology stack that serves the people, not the empire.
          </p>
          <div className="scale-90 origin-left">
            <BuySection />
          </div>
        </div>

        <img
          src="/assets/book_logo.png"
          alt="Digital Degrowth Book Cover"
          className="book-cover w-64 h-96 md:w-80 md:h-[480px] justify-self-center"
        />
      </div>
    </section>

    <section id="about" className="section-band py-16 border-y">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[color:var(--accent)] shadow-xl z-10 bg-black">
            <img
              src="/assets/image1.webp"
              alt="Digital Degrowth Logo"
              width="480"
              height="480"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-5">
          <p className="section-kicker">Definition</p>
          <h2 className="text-3xl md:text-5xl">
            What is Digital Degrowth?
          </h2>
        </div>
        <div className="space-y-8">
          <p className="section-copy text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Digital degrowth is a movement to unlearn our obsession with
            infinite digital expansion. True freedom lies in decentralized,
            human-scale infrastructure that respects both the ecology of our
            planet and the sovereignty of our minds. To achieve this, we must
            dismantle the chains of Big Tech dominance and digital colonialism
            that currently define our world. We should prioritize local,
            resilient networks over global surveillance grids that prioritize
            profit over people. By reclaiming the ownership of our data and
            tools, we return power to the community and foster genuine
            connection. This transition is essential for building a technology
            stack that serves the common good rather than imperial interests.
          </p>
          <Link to="/blog" className="news-link !text-sm">
            Read more <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>

    <section id="praise" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-4">
          <p className="section-kicker">Critical praise</p>
        </div>

        <div className="quote-shell">
          <div className="relative max-w-4xl mx-auto px-4 md:px-16">
            <div className="max-w-3xl mx-auto quote-frame">
              <img
                key={citationIndex}
                src={citations[citationIndex]}
                alt={`Citation ${citationIndex + 1}`}
                width="1200"
                height="720"
                className="w-full h-auto object-cover animate-fade"
              />
            </div>

            <button
              aria-label="Previous citation"
              onClick={prevCitation}
              className="absolute left-6 md:left-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-[color:var(--line)] bg-[rgba(255,253,249,0.92)] text-[color:var(--accent-deep)] shadow-sm transition duration-300 hover:scale-105 hover:border-[rgba(155,230,79,0.45)] hover:bg-white"
            >
              <ChevronLeft size={18} className="mx-auto" aria-hidden="true" />
            </button>

            <button
              aria-label="Next citation"
              onClick={nextCitation}
              className="absolute right-6 md:right-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-[color:var(--line)] bg-[rgba(255,253,249,0.92)] text-[color:var(--accent-deep)] shadow-sm transition duration-300 hover:scale-105 hover:border-[rgba(155,230,79,0.45)] hover:bg-white"
            >
              <ChevronRight size={18} className="mx-auto" aria-hidden="true" />
            </button>

            <div className="flex justify-center gap-3 mt-6">
              {citations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCitationIndex(i)}
                  className={`quote-dot ${i === citationIndex ? "quote-dot--active" : ""}`}
                  aria-label={`Go to citation ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="news" className="py-24 border-t border-border bg-[color:var(--bg-soft)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[color:var(--accent-warm)]">Dispatches</p>
            <h3 className="text-4xl md:text-6xl tracking-tight">
              Latest from the archive
            </h3>
          </div>
          <Link to="/blog" className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--ink)] hover:text-[color:var(--accent-warm)] transition-colors">
            View full archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {latestArticles.map((news) => (
            <Link
              key={news.slug}
              to={`/blog/${news.slug}`}
              className="group block space-y-6"
            >
              <div className="relative overflow-hidden rounded-xl border border-border bg-muted aspect-[4/3] shadow-md group-hover:shadow-xl transition-shadow">
                <img
                  src={news.image}
                  alt={news.title}
                  className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-[color:var(--ink)] text-white text-[8px] font-bold uppercase tracking-widest rounded-sm">
                    {news.tag}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[color:var(--accent-warm)]">
                    {news.outlet}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    {formatArticleDate(news.date)}
                  </span>
                </div>
                <h4 className="text-2xl leading-tight group-hover:text-[color:var(--accent-warm)] transition-colors">
                  {news.title}
                </h4>
                <p className="text-xs leading-relaxed text-[color:var(--ink-soft)] italic line-clamp-2">
                  {news.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section
      id="author"
      className="section-panel py-12 border-t border-[color:var(--line)]"
    >
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1 space-y-4">
          <div className="space-y-2">
            <p className="section-kicker">Profile</p>
            <h3 className="flex items-center gap-2 text-xl md:text-2xl">
              <User className="text-[color:var(--accent-deep)]" size={20} />
              The Author
            </h3>
          </div>
          <p className="section-copy leading-relaxed text-base">
            Michael Kwet is a leading researcher and activist focused on
            digital colonialism and the political economy of the internet. His
            work spans journalism, academia, and grassroots organizing,
            consistently challenging the hegemony of global tech giants.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="https://twitter.com/michaelkwet"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Follow Michael Kwet on Twitter"
            >
              <Twitter size={18} aria-hidden="true" />
            </a>
            <a
              href="https://michaelkwet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Visit Michael Kwet's website"
            >
              <Globe size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-48 h-48 md:w-56 md:h-56">
            <div className="author-frame" />
            <div className="author-card flex items-center justify-center">
              <User
                size={80}
                className="text-[rgba(var(--accent-rgb),0.34)]"
              />
              <div className="author-card__footer !py-2 !text-[10px]">Michael Kwet</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [citationIndex, setCitationIndex] = useState(0);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isBlog = location.pathname.startsWith("/blog");
  const blogPage = Math.max(0, (Number(searchParams.get("page") ?? "1") || 1) - 1);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCitationIndex((prev) => (prev + 1) % citations.length);
    }, 4000);

    return () => clearInterval(interval);
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

  const nextCitation = () => {
    setCitationIndex((prev) => (prev + 1) % citations.length);
  };

  const prevCitation = () => {
    setCitationIndex(
      (prev) => (prev - 1 + citations.length) % citations.length,
    );
  };

  return (
    <div className="app-shell min-h-screen">
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

      <main id="main-content" className="main-shell">
        <Routes>
          <Route path="/" element={<HomePage 
            citationIndex={citationIndex} 
            nextCitation={nextCitation} 
            prevCitation={prevCitation} 
            setCitationIndex={setCitationIndex} 
          />} />
          <Route 
            path="/blog" 
            element={<BlogPage currentPage={blogPage} pageSize={BLOG_ARCHIVE_BATCH_SIZE} />} 
          />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </main>

      <footer className="footer-shell py-8 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <div className="brand-mark">
              <span className="brand-mark__pulse" />
              <span>Digital Degrowth</span>
            </div>
            <p className="text-sm text-[color:var(--ink-soft)]">
              © 2025 Michael Kwet — technology in the age of survival.
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
    </div>
  );
};

export default App;
