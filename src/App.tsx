import React, { useEffect, useState } from "react";
import {
  BookOpen,
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
  Newspaper,
  User,
  ExternalLink,
  Github,
  Twitter,
  Globe,
} from "lucide-react";

const latestArticles = [
  {
    date: "June 20, 2024",
    title: "Digital Degrowth: Can we survive without the Cloud?",
    outlet: "The Guardian",
    image: "/assets/articles/cloud-degrowth-new.png",
    caption: "Cloud extraction rendered as a soft machine horizon.",
  },
  {
    date: "May 15, 2024",
    title: "Unmasking Digital Colonialism in Lebanon",
    outlet: "People's Tech",
    image: "/assets/articles/digital-colonialism-new.png",
    caption:
      "A fractured map and signal pathways mark imperial infrastructure.",
  },
  {
    date: "April 02, 2024",
    title: "Why the Silicon Valley Bank Run matters for Degrowth",
    outlet: "Tech Empire",
    image: "/assets/articles/svb-degrowth-new.png",
    caption:
      "Market collapse translated into unstable data towers and slipping graphs.",
  },
];

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [citationIndex, setCitationIndex] = useState(0);

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

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCitationIndex((prev) => (prev + 1) % citations.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [citations.length]);

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
      { label: "Amazon", url: "#", icon: <ShoppingCart size={16} /> },
      { label: "Takealot", url: "#", icon: <ExternalLink size={16} /> },
      { label: "Apple Books", url: "#", icon: <BookOpen size={16} /> },
    ];

    return (
      <div
        id="buy"
        className="flex flex-col items-start space-y-6 pt-8 animate-fade"
      >
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

  return (
    <div className="app-shell min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="ambient-wash absolute inset-0" />
        <div className="paper-grain absolute inset-0" />
      </div>

      <nav
        className={`site-nav ${scrolled ? "site-nav--scrolled" : "site-nav--top"}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="brand-mark">
            <span className="brand-mark__block">Digital</span>
            <span>Degrowth</span>
          </div>
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
          <a href="#buy" className="button-primary !px-4 !py-2 !text-[11px]">
            Buy Now
          </a>
        </div>
      </nav>

      <section
        id="home"
        className="relative py-12 md:py-16 flex items-center overflow-hidden"
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
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="flex justify-center">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[color:var(--accent)] shadow-xl z-10 bg-black">
              <img
                src="/assets/image1.webp"
                alt="Digital Degrowth Logo"
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
            <p className="font-display text-xl md:text-2xl text-[color:var(--ink)] leading-relaxed italic max-w-3xl mx-auto">
              "We must unlearn the obsession with infinite digital expansion.
              True freedom lies in decentralized, human-scale infrastructure
              that respects the ecology of our planet and the sovereignty of our
              minds."
            </p>
            <a href="#" className="news-link !text-sm">
              Read more <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section id="praise" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <p className="section-kicker">Critical praise</p>
          </div>

          <div className="quote-shell mt-8">
            <div className="relative max-w-4xl mx-auto px-4 md:px-16">
              <div className="max-w-3xl mx-auto quote-frame">
                <img
                  key={citationIndex}
                  src={citations[citationIndex]}
                  alt={`Citation ${citationIndex + 1}`}
                  className="w-full h-auto object-cover animate-fade"
                />
              </div>

              <button
                aria-label="Previous citation"
                onClick={prevCitation}
                className="absolute left-6 md:left-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-[color:var(--line)] bg-[rgba(255,253,249,0.92)] text-[color:var(--accent-deep)] shadow-sm transition-all duration-300 hover:scale-105 hover:border-[rgba(155,230,79,0.45)] hover:bg-white"
              >
                <ChevronLeft size={18} className="mx-auto" />
              </button>

              <button
                aria-label="Next citation"
                onClick={nextCitation}
                className="absolute right-6 md:right-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-[color:var(--line)] bg-[rgba(255,253,249,0.92)] text-[color:var(--accent-deep)] shadow-sm transition-all duration-300 hover:scale-105 hover:border-[rgba(155,230,79,0.45)] hover:bg-white"
              >
                <ChevronRight size={18} className="mx-auto" />
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
          <div className="flex justify-between items-end mb-12 gap-6">
            <div className="space-y-3">
              <p className="section-kicker">Coverage</p>
              <h3 className="section-heading flex items-center gap-3 text-2xl md:text-3xl">
                <Newspaper className="text-[color:var(--accent-deep)]" />
                Latest Articles
              </h3>
            </div>
            <a href="#" className="news-link">
              All articles <ChevronRight size={14} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestArticles.map((news, i) => (
              <div key={i} className="news-card">
                <div className="news-card__media">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="news-card__art"
                  />
                  <div className="news-card__outlet">{news.outlet}</div>
                  <p className="news-card__caption">{news.caption}</p>
                </div>
                <p className="news-meta">
                  {news.date} - {news.outlet}
                </p>
                <h4 className="news-title">{news.title}</h4>
              </div>
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
              <Twitter className="social-link" />
              <Github className="social-link" />
              <Globe className="social-link" />
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="author-frame" />
              <div className="author-card flex items-center justify-center">
                <User size={120} className="text-[rgba(155,230,79,0.34)]" />
                <div className="author-card__footer">Michael Kwet</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-shell py-8 text-center">
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
              <a href="#" className="footer-link">
                Manifesto
              </a>
              <a href="#" className="footer-link">
                People&apos;s Tech
              </a>
              <a href="#" className="footer-link">
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
