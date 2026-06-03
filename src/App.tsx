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
} from "lucide-react";

type Route = "home" | "blog";

type ArticleCard = {
  date: string;
  title: string;
  outlet: string;
  image: string;
  caption: string;
  excerpt: string;
  tag: string;
  readTime: string;
  variant: "feature" | "wide" | "tall" | "standard";
};

const latestArticles = [
  {
    date: "2024-06-20",
    title: "Digital Degrowth: Can we survive without the Cloud?",
    outlet: "The Guardian",
    image: "/assets/articles/cloud-degrowth-new.png",
    caption: "Cloud extraction rendered as a soft machine horizon.",
  },
  {
    date: "2024-05-15",
    title: "Unmasking Digital Colonialism in Lebanon",
    outlet: "People's Tech",
    image: "/assets/articles/digital-colonialism-new.png",
    caption:
      "A fractured map and signal pathways mark imperial infrastructure.",
  },
  {
    date: "2024-04-02",
    title: "Why the Silicon Valley Bank Run matters for Degrowth",
    outlet: "Tech Empire",
    image: "/assets/articles/svb-degrowth-new.png",
    caption:
      "Market collapse translated into unstable data towers and slipping graphs.",
  },
];

const blogArticles: ArticleCard[] = [
  {
    date: "2024-06-20",
    title: "Digital Degrowth: Can we survive without the Cloud?",
    outlet: "The Guardian",
    image: "/assets/articles/cloud-degrowth-new.png",
    caption: "Cloud extraction rendered as a soft machine horizon.",
    excerpt:
      "A lead feature designed for the top of the grid: big headline, atmospheric artwork, and enough space for a sharp thesis before the reader enters the archive.",
    tag: "Featured Essay",
    readTime: "8 min read",
    variant: "feature",
  },
  {
    date: "2024-05-15",
    title: "Unmasking Digital Colonialism in Lebanon",
    outlet: "People's Tech",
    image: "/assets/articles/digital-colonialism-new.png",
    caption:
      "A fractured map and signal pathways mark imperial infrastructure.",
    excerpt:
      "A tall card for reportage and field dispatches, balancing image weight with an excerpt that still feels spacious on desktop.",
    tag: "Field Report",
    readTime: "6 min read",
    variant: "tall",
  },
  {
    date: "2024-04-02",
    title: "Why the Silicon Valley Bank Run matters for Degrowth",
    outlet: "Tech Empire",
    image: "/assets/articles/svb-degrowth-new.png",
    caption:
      "Market collapse translated into unstable data towers and slipping graphs.",
    excerpt:
      "A wider block for analysis pieces, where metadata, deck, and visual rhythm sit in a denser magazine-style composition.",
    tag: "Analysis",
    readTime: "5 min read",
    variant: "wide",
  },
  {
    date: "2024-03-18",
    title: "How community-owned networks reshape digital sovereignty",
    outlet: "People's Tech",
    image: "/assets/articles/digital-colonialism-new.png",
    caption: "Signals rerouted toward local infrastructures and public power.",
    excerpt:
      "Compact card styling for recurring essays, built to keep the archive browsable and scannable in a true grid view.",
    tag: "Infrastructure",
    readTime: "4 min read",
    variant: "standard",
  },
  {
    date: "2024-02-10",
    title: "The politics of bandwidth scarcity and planned digital restraint",
    outlet: "The Guardian",
    image: "/assets/articles/cloud-degrowth-new.png",
    caption: "Bandwidth shown as a finite resource rather than endless excess.",
    excerpt:
      "Short cards hold topical arguments and keep the visual cadence moving between larger anchor stories.",
    tag: "Opinion",
    readTime: "3 min read",
    variant: "standard",
  },
  {
    date: "2024-01-27",
    title: "Designing media systems beyond platform dependency",
    outlet: "Tech Empire",
    image: "/assets/articles/svb-degrowth-new.png",
    caption: "Editorial systems laid out like civic infrastructure instead of apps.",
    excerpt:
      "This slot is ideal for interviews, essays, or book excerpts that need a measured amount of context without taking over the full page.",
    tag: "Interview",
    readTime: "7 min read",
    variant: "tall",
  },
];

const getRouteFromHash = (): Route =>
  window.location.hash === "#blog" ? "blog" : "home";

const BLOG_ARCHIVE_BATCH_SIZE = 2;
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [citationIndex, setCitationIndex] = useState(0);
  const [route, setRoute] = useState<Route>(getRouteFromHash);
  const [archivePage, setArchivePage] = useState(0);

  const citations = [
    "/assets/qoutes/kwet1.jpg",
    "/assets/qoutes/kwet2.jpg",
    "/assets/qoutes/kwet3.jpg",
    "/assets/qoutes/kwet4.jpg",
    "/assets/qoutes/kwet5.jpg",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleHashChange = () => {
      setRoute(getRouteFromHash());
    };

    handleScroll();
    handleHashChange();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCitationIndex((prev) => (prev + 1) % citations.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [citations.length]);

  useEffect(() => {
    if (route === "blog") {
      setArchivePage(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [route]);

  const nextCitation = () => {
    setCitationIndex((prev) => (prev + 1) % citations.length);
  };

  const prevCitation = () => {
    setCitationIndex(
      (prev) => (prev - 1 + citations.length) % citations.length,
    );
  };

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
          <h2 className="text-3xl md:text-4xl font-bold font-display text-[color:var(--ink)]">
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

  const HomePage = () => (
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
            <h2 className="section-heading text-3xl md:text-5xl">
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
            <a href="#blog" className="news-link !text-sm">
              Read more <ChevronRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="praise" className="py-16">
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

      <section id="news" className="py-16 border-t border-[color:var(--line)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-8 gap-6">
            <div className="space-y-3">
              <p className="section-kicker">Coverage</p>
              <h3 className="section-heading flex items-center gap-3 text-2xl md:text-3xl">
                <Newspaper className="text-[color:var(--accent-deep)]" />
                Latest Articles
              </h3>
            </div>
            <a href="#blog" className="news-link">
              All articles <ChevronRight size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestArticles.map((news) => (
              <a
                key={news.title}
                href="#blog"
                className="news-card text-left"
              >
                <div className="news-card__media">
                  <img
                    src={news.image}
                    alt={news.title}
                    width="1200"
                    height="760"
                    loading="lazy"
                    className="news-card__art"
                  />
                  <div className="news-card__outlet">{news.outlet}</div>
                  <p className="news-card__caption">{news.caption}</p>
                </div>
                <p className="news-meta">
                  {formatDate(news.date)} - {news.outlet}
                </p>
                <h4 className="news-title">{news.title}</h4>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="author"
        className="section-panel py-16 border-t border-[color:var(--line)]"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <div className="space-y-3">
              <p className="section-kicker">Profile</p>
              <h3 className="section-heading flex items-center gap-3 text-2xl md:text-3xl">
                <User className="text-[color:var(--accent-deep)]" />
                The Author
              </h3>
            </div>
            <p className="section-copy leading-relaxed text-lg">
              Michael Kwet is a leading researcher and activist focused on
              digital colonialism and the political economy of the internet. His
              work spans journalism, academia, and grassroots organizing,
              consistently challenging the hegemony of global tech giants.
            </p>
            <p className="section-copy leading-relaxed">
              Based between the US and South Africa, Michael has been a vocal
              proponent of "People&apos;s Tech" - a vision for technology that
              empowers communities rather than exploiting them.
            </p>
            <div className="flex gap-4 pt-4">
              <span className="social-link" aria-hidden="true">
                <Twitter aria-hidden="true" />
              </span>
              <span className="social-link" aria-hidden="true">
                <Github aria-hidden="true" />
              </span>
              <span className="social-link" aria-hidden="true">
                <Globe aria-hidden="true" />
              </span>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="author-frame" />
              <div className="author-card flex items-center justify-center">
                <User
                  size={120}
                  className="text-[rgba(var(--accent-rgb),0.34)]"
                />
                <div className="author-card__footer">Michael Kwet</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const BlogPage = () => {
    const [featureArticle, ...archiveArticles] = blogArticles;
    const topStories = archiveArticles.slice(0, 2);
    const totalPages = Math.ceil(
      archiveArticles.length / BLOG_ARCHIVE_BATCH_SIZE,
    );
    const archiveStartIndex = archivePage * BLOG_ARCHIVE_BATCH_SIZE;
    const gridArticles = archiveArticles.slice(
      archiveStartIndex,
      archiveStartIndex + BLOG_ARCHIVE_BATCH_SIZE,
    );
    const archiveRangeStart = archiveStartIndex + 1;
    const archiveRangeEnd = archiveStartIndex + gridArticles.length;
    const hasPreviousPage = archivePage > 0;
    const hasNextPage = archivePage < totalPages - 1;

    return (
      <section className="blog-page">
        <div className="blog-dark-shell">
          <div className="max-w-6xl mx-auto px-6 py-28 md:py-32">
            <div className="blog-dark-shell__header">
              <p className="blog-kicker">Articles</p>
              <p className="blog-dark-shell__summary">
                Dispatches, essays, and critiques on digital colonialism,
                platform power, and resistance networks.
              </p>
            </div>

            <div className="blog-feature-layout">
              <article className="blog-feature-card">
                <div className="blog-feature-card__image-wrap">
                  <img
                    src={featureArticle.image}
                    alt={featureArticle.title}
                    width="1600"
                    height="980"
                    fetchPriority="high"
                    className="blog-feature-card__image"
                  />
                </div>
                <div className="blog-feature-card__overlay">
                  <p className="blog-feature-card__meta">
                    <span>{formatDate(featureArticle.date)}</span>
                    <span>{featureArticle.outlet}</span>
                  </p>
                  <h1 className="blog-feature-card__title">
                    {featureArticle.title}
                  </h1>
                </div>
              </article>

              <div className="blog-feature-side">
                <div className="blog-feature-side__lead">
                  <p className="blog-feature-side__eyebrow">Lead story</p>
                  <h2>{featureArticle.title}</h2>
                  <p>{featureArticle.excerpt}</p>
                </div>

                {topStories.map((article) => (
                  <article
                    key={`${article.title}-${article.date}`}
                    className="blog-side-story"
                  >
                    <div className="blog-side-story__thumb">
                      <img
                        src={article.image}
                        alt={article.title}
                        width="640"
                        height="540"
                        loading="lazy"
                      />
                    </div>
                    <div className="blog-side-story__body">
                      <h3>{article.title}</h3>
                      <p>{formatDate(article.date)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="blog-archive-shell">
          <div className="max-w-6xl mx-auto px-6 py-14 md:py-16 space-y-10">
            <div className="blog-archive-toolbar">
              <span>Total {archiveArticles.length}</span>
              <span>
                {archiveRangeStart}-{archiveRangeEnd} of {archiveArticles.length}
              </span>
              <span>Sort by newest</span>
            </div>

            <div className="blog-archive-grid">
              {gridArticles.map((article) => (
                <article
                  key={`${article.title}-${article.date}`}
                  className="blog-archive-card"
                >
                  <div className="blog-archive-card__media">
                    <img
                      src={article.image}
                      alt={article.title}
                      width="1200"
                      height="760"
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-archive-card__body">
                    <p className="blog-archive-card__author">{article.outlet}</p>
                    <h2>{article.title}</h2>
                    <p className="blog-archive-card__date">
                      {formatDate(article.date)}
                    </p>
                    <p className="blog-archive-card__excerpt">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="blog-archive-toolbar">
              <span>Total {archiveArticles.length}</span>
              <span>
                Page {archivePage + 1} of {totalPages}
              </span>
              <div className="blog-archive-pagination">
                <button
                  type="button"
                  onClick={() => setArchivePage((current) => current - 1)}
                  disabled={!hasPreviousPage}
                  className="blog-archive-pagination__button"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setArchivePage((current) => current + 1)}
                  disabled={!hasNextPage}
                  className="blog-archive-pagination__button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
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
        className={`site-nav ${scrolled ? "site-nav--scrolled" : "site-nav--top"} ${route === "blog" ? "site-nav--blog" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center gap-6">
          <a
            href="#home"
            className={`brand-mark text-left ${route === "blog" ? "brand-mark--blog" : ""}`}
          >
            <span className="brand-mark__block">Digital</span>
            <span>Degrowth</span>
          </a>

          {route === "home" ? (
            <div className="hidden md:flex gap-8 text-sm uppercase tracking-[0.28em]">
              {["About", "Praise", "News", "Author"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-link"
                >
                  {item}
                </a>
              ))}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3 blog-nav-note">
              <Newspaper size={16} aria-hidden="true" />
              <span>Editorial archive</span>
            </div>
          )}

          <a
            href={route === "home" ? "#blog" : "#home"}
            className="button-primary !px-4 !py-2 !text-[11px]"
          >
            {route === "home" ? "Blog" : "Back Home"}
          </a>
        </div>

        {route === "home" ? (
          <div className="mobile-nav-strip md:hidden">
            {["About", "Praise", "News", "Author"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="mobile-nav-chip"
              >
                {item}
              </a>
            ))}
          </div>
        ) : null}
      </nav>

      <main id="main-content" className="main-shell">
        {route === "blog" ? <BlogPage /> : <HomePage />}
      </main>

      <footer className="footer-shell py-12 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <div className="brand-mark">
              <span className="brand-mark__block">Digital</span>
              <span>Degrowth</span>
            </div>
            <p className="text-xs text-[color:var(--ink-soft)] uppercase tracking-[0.2em]">
              © 2025 Michael Kwet - All tools reclaimed - CC BY 4.0
            </p>
            <div className="flex gap-8">
              <a href="#about" className="footer-link">
                Manifesto
              </a>
              <a href="#blog" className="footer-link">
                Blog
              </a>
              <a href="#author" className="footer-link">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
