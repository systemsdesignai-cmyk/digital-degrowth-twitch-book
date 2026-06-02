import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  Github,
  Globe,
  LayoutGrid,
  Newspaper,
  ShoppingCart,
  Twitter,
  User,
  Workflow,
} from "lucide-react";

const editions = [
  { label: "Amazon", href: "#buy", icon: ShoppingCart },
  { label: "Takealot", href: "#buy", icon: ExternalLink },
  { label: "Apple Books", href: "#buy", icon: BookOpen },
];

const definitionCards = [
  {
    title: "Shrink the stack",
    desc: "Reduce extractive platforms, overbuilt infrastructure, and the assumption that more computation is always progress.",
  },
  {
    title: "Build locally",
    desc: "Shift toward public, accountable, community-controlled systems that can be governed where people actually live.",
  },
  {
    title: "Protect autonomy",
    desc: "Refuse digital colonialism by reclaiming data, labor, and decision-making from monopolistic cloud empires.",
  },
];

const citations = [
  {
    image: "/assets/qoutes/kwet1.jpg",
    publication: "The New Republic",
    quote:
      "A piercing account of how digital systems reproduce empire under the language of innovation.",
    response:
      "Kwet answers with a practical degrowth frame: less extraction, more democratic infrastructure, and technology sized to social need.",
  },
  {
    image: "/assets/qoutes/kwet2.jpg",
    publication: "People's Tech",
    quote:
      "A rare intervention that connects platform power, colonial history, and the environmental cost of scale.",
    response:
      "The book argues that resisting surveillance capitalism requires replacing its technical foundations, not merely regulating its excesses.",
  },
  {
    image: "/assets/qoutes/kwet3.jpg",
    publication: "ROAR",
    quote:
      "Digital Degrowth turns critique into strategy, outlining where communities can actually begin.",
    response:
      "From community networks to public-interest software, the response is deliberately concrete and grounded in movement-building.",
  },
  {
    image: "/assets/qoutes/kwet4.jpg",
    publication: "Africa Is a Country",
    quote:
      "An uncompromising challenge to the myth that the cloud is weightless, neutral, or inevitable.",
    response:
      "Kwet reframes the cloud as infrastructure that can be contested, downsized, and rebuilt around sovereignty.",
  },
  {
    image: "/assets/qoutes/kwet5.jpg",
    publication: "Protean Magazine",
    quote:
      "Urgent and unusually readable, with the force of a manifesto and the patience of careful research.",
    response:
      "That balance between sharp analysis and accessible language makes the book legible to organizers, students, and general readers alike.",
  },
];

const tutorialSteps = [
  {
    title: "Model the content",
    desc: "Create structured article entries for title, outlet, date, image, excerpt, and citation assets so the page can be fed from a headless CMS cleanly.",
    icon: Database,
  },
  {
    title: "Compose the editorial grid",
    desc: "Map one featured story and supporting stories into a magazine-style layout that keeps the page readable even as more articles are added.",
    icon: LayoutGrid,
  },
  {
    title: "Ship with publishing flow",
    desc: "Connect review, publishing, and updates so press coverage and responses can be added without rewriting the front-end each time.",
    icon: Workflow,
  },
];

const latestArticles = [
  {
    date: "June 20, 2024",
    title: "Digital Degrowth: Can we survive without the Cloud?",
    outlet: "The Guardian",
    image: "/assets/articles/cloud-degrowth-new.png",
    caption: "Cloud extraction rendered as a soft machine horizon.",
    excerpt:
      "A featured analysis on why digital abundance is sold as inevitability while its ecological and political costs stay hidden.",
  },
  {
    date: "May 15, 2024",
    title: "Unmasking Digital Colonialism in Lebanon",
    outlet: "People's Tech",
    image: "/assets/articles/digital-colonialism-new.png",
    caption:
      "A fractured map and signal pathways mark imperial infrastructure.",
    excerpt:
      "Ground-level reporting on how dependency is engineered into platforms, governance, and international technology policy.",
  },
  {
    date: "April 02, 2024",
    title: "Why the Silicon Valley Bank Run matters for Degrowth",
    outlet: "Tech Empire",
    image: "/assets/articles/svb-degrowth-new.png",
    caption:
      "Market collapse translated into unstable data towers and slipping graphs.",
    excerpt:
      "A systems view of financial crisis, platform speculation, and the fragile economics underwriting digital expansion.",
  },
];

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [citationIndex, setCitationIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCitationIndex((prev) => (prev + 1) % citations.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const activeCitation = citations[citationIndex];

  return (
    <div className="app-shell min-h-screen">
      <div className="ambient-grid" />
      <div className="ambient-glow" />

      <nav
        className={`site-nav ${scrolled ? "site-nav--scrolled" : "site-nav--top"}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <a href="#home" className="brand-mark" aria-label="Digital Degrowth">
            <span className="brand-mark__pulse" />
            <span>Digital Degrowth</span>
          </a>

          <div className="hidden gap-8 text-sm uppercase tracking-[0.24em] md:flex">
            {["About", "Praise", "Tutorials", "News", "Author"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
              >
                {item}
              </a>
            ))}
          </div>

          <a href="#buy" className="button-primary !px-4 !py-2 !text-[11px]">
            Buy now
          </a>
        </div>
      </nav>

      <section
        id="home"
        className="relative overflow-hidden px-6 pb-14 pt-28 md:pb-20 md:pt-36"
      >
        <div className="hero-panel mx-auto grid max-w-6xl gap-12 p-8 md:grid-cols-[1.05fr_0.95fr] md:p-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="hero-badge">Technology in the age of survival</span>
              <div className="space-y-4">
                <h1 className="hero-title text-5xl md:text-7xl">
                  The electric-green argument against digital empire.
                </h1>
                <p className="hero-copy">
                  <span>Digital Degrowth</span> reframes the internet as material,
                  political infrastructure and asks what happens when we stop
                  mistaking endless scale for freedom.
                </p>
              </div>
            </div>

            <div id="buy" className="flex flex-wrap gap-3">
              {editions.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} className="button-primary">
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>

            <p className="hero-micro">
              Michael Kwet&apos;s new book tracks digital colonialism, cloud
              expansion, and how smaller, accountable systems become a political
              project.
            </p>
          </div>

          <div className="hero-book-stage">
            <img
              src="/assets/book_logo.png"
              alt="Digital Degrowth book cover"
              className="hero-book"
            />
            <div className="hero-book__badge">
              <img
                src="/assets/image2.webp"
                alt="Digital Degrowth neon emblem"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hero-book__note">
              <span className="hero-book__note-label">Book image</span>
              <strong>Restored to the electric green cover treatment.</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-shell">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[0.82fr_1.18fr] md:items-start">
          <div className="definition-shell">
            <div className="definition-stamp">
              <img
                src="/assets/image1.webp"
                alt="Digital Degrowth cable fist emblem"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="section-kicker">Two-line definition</p>
            <p className="definition-lead">
              Digital degrowth is the refusal of wasteful, extractive,
              forever-scaling tech systems.
            </p>
            <p className="definition-lead definition-lead--soft">
              It favors public, local, and human-scale infrastructure that people
              can govern together.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="section-kicker">What stays on the page</p>
              <h2 className="section-heading text-3xl md:text-5xl">
                A shorter explanation, with the heavy label removed.
              </h2>
              <p className="section-copy max-w-3xl text-lg">
                The section now reads like an editorial opener instead of a
                glossary block, while keeping the core argument visible at a
                glance.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {definitionCards.map((card) => (
                <article key={card.title} className="summary-card">
                  <p className="summary-card__title">{card.title}</p>
                  <p className="section-copy text-sm">{card.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="praise" className="section-shell section-shell--muted">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-3xl space-y-3">
            <p className="section-kicker">Press citations and response</p>
            <h2 className="section-heading text-3xl md:text-5xl">
              Citations on one side, the argument back on the other.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="quote-stage">
              <div className="quote-frame">
                <img
                  key={activeCitation.image}
                  src={activeCitation.image}
                  alt={`${activeCitation.publication} citation`}
                  className="h-full w-full animate-fade object-cover"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-3">
                  <button
                    aria-label="Previous citation"
                    onClick={() =>
                      setCitationIndex(
                        (prev) => (prev - 1 + citations.length) % citations.length,
                      )
                    }
                    className="quote-arrow"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    aria-label="Next citation"
                    onClick={() =>
                      setCitationIndex((prev) => (prev + 1) % citations.length)
                    }
                    className="quote-arrow"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="flex gap-2">
                  {citations.map((citation, index) => (
                    <button
                      key={citation.image}
                      onClick={() => setCitationIndex(index)}
                      className={`quote-dot ${index === citationIndex ? "quote-dot--active" : ""}`}
                      aria-label={`Go to ${citation.publication}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <article className="response-card">
              <p className="quote-meta">{activeCitation.publication}</p>
              <blockquote className="response-card__quote">
                “{activeCitation.quote}”
              </blockquote>
              <p className="section-copy text-base md:text-lg">
                {activeCitation.response}
              </p>
              <div className="response-card__line" />
              <p className="response-card__foot">
                The carousel now pairs each clipping with its takeaway instead of
                leaving the citations to stand alone.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="tutorials" className="section-shell">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="section-kicker">Tutorial / Headless CMS</p>
              <h2 className="section-heading text-3xl md:text-5xl">
                A publishing flow ready for a CMS-backed version of the site.
              </h2>
            </div>
            <p className="section-copy max-w-xl text-sm md:text-base">
              The structure below turns the page into reusable content blocks
              instead of a one-off static layout.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {tutorialSteps.map(({ title, desc, icon: Icon }) => (
              <article key={title} className="tutorial-card">
                <span className="icon-chip">
                  <Icon size={22} />
                </span>
                <div className="space-y-3">
                  <h3 className="summary-card__title !text-base !tracking-[0.12em]">
                    {title}
                  </h3>
                  <p className="section-copy text-sm">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="news"
        className="section-shell section-shell--muted border-y border-[color:var(--line)]"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="section-kicker">Grid style articles page</p>
              <h2 className="section-heading flex items-center gap-3 text-3xl md:text-5xl">
                <Newspaper className="text-[color:var(--accent)]" />
                Editorial coverage, arranged like a magazine grid.
              </h2>
            </div>
            <a href="#tutorials" className="news-link">
              People&apos;s Tech layout direction <ChevronRight size={14} />
            </a>
          </div>

          <div className="news-grid">
            {latestArticles.map((article, index) => (
              <article
                key={article.title}
                className={`news-card ${index === 0 ? "news-card--feature" : ""}`}
              >
                <div className="news-card__media">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="news-card__art"
                  />
                  <div className="news-card__overlay">
                    <p className="news-card__eyebrow">{article.outlet}</p>
                    <p className="news-card__caption">{article.caption}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="quote-meta">
                    {article.date} / {article.outlet}
                  </p>
                  <h3 className="news-card__title">{article.title}</h3>
                  <p className="news-card__excerpt">{article.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="author" className="section-shell">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_0.95fr] md:items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="section-kicker">Author</p>
              <h2 className="section-heading flex items-center gap-3 text-3xl md:text-5xl">
                <User className="text-[color:var(--accent)]" />
                Michael Kwet
              </h2>
            </div>
            <p className="section-copy text-lg">
              Michael Kwet is a researcher and writer whose work connects digital
              colonialism, political economy, education, and technological
              sovereignty.
            </p>
            <p className="section-copy">
              His reporting and scholarship consistently push past platform
              critique toward public alternatives: smaller systems, democratic
              control, and infrastructure built to serve communities rather than
              empire.
            </p>

            <div className="flex gap-3 pt-2">
              {[Twitter, Github, Globe].map((Icon, index) => (
                <a
                  key={index}
                  href="#author"
                  className="social-link"
                  aria-label="Author link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="author-card">
            <div className="author-frame" />
            <div className="author-card__panel">
              <img
                src="/assets/logo.png"
                alt="Digital Degrowth pixel fist emblem"
                className="author-card__art"
              />
              <div className="author-card__footer">
                <span>Researcher / Writer / Organizer</span>
                <strong>Michael Kwet</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-shell">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="brand-mark">
              <span className="brand-mark__pulse" />
              <span>Digital Degrowth</span>
            </div>
            <p className="text-sm text-[color:var(--ink-soft)]">
              © 2025 Michael Kwet — technology in the age of survival.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <a href="#about" className="footer-link">
              About
            </a>
            <a href="#praise" className="footer-link">
              Press
            </a>
            <a href="#tutorials" className="footer-link">
              Tutorials
            </a>
            <a href="#news" className="footer-link">
              Articles
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
