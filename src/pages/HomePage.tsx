import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Newspaper,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  MessageSquare,
  User,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BuySection } from "@/components/common/BuySection";
import { SEO } from "@/components/common/SEO";
import { useArticles } from "@/hooks/useArticles";
import { useCitations } from "@/hooks/useCitations";
import { useHomeSettings, useAuthor } from "@/hooks/useSettings";
import { urlFor } from "@/sanity/lib/image";

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export const HomePage = () => {
  const [citationIndex, setCitationIndex] = useState(0);
  const { articles, loading: articlesLoading } = useArticles();
  const { citations, loading: citationsLoading } = useCitations();
  const { settings: homeSettings, loading: settingsLoading } =
    useHomeSettings();
  const { author, loading: authorLoading } = useAuthor();

  const isLoading =
    articlesLoading || citationsLoading || settingsLoading || authorLoading;

  useEffect(() => {
    if (!citations || citations.length === 0) return;
    const interval = setInterval(() => {
      setCitationIndex((prev) => (prev + 1) % citations.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [citations?.length]);

  const nextCitation = () => {
    if (!citations) return;
    setCitationIndex((prev) => (prev + 1) % citations.length);
  };

  const prevCitation = () => {
    if (!citations) return;
    setCitationIndex(
      (prev) => (prev - 1 + citations.length) % citations.length,
    );
  };

  const getArticleSlug = (article: any) => {
    return article.slug.current;
  };

  const getArticleImage = (article: any) => {
    return urlFor(article.image).url();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[color:var(--ink)]">
        <Loader2 className="h-12 w-12 animate-spin text-[color:var(--accent)]" />
      </div>
    );
  }

  if (!homeSettings || !author) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[color:var(--ink)] text-white gap-4">
        <h1 className="text-2xl font-display">Site settings missing.</h1>
        <p className="text-white/60">
          Please configure the Home Settings and Author in Sanity.
        </p>
      </div>
    );
  }

  return (
    <>
      <SEO title="Home" />
      <section
        id="home"
        className="relative py-16 md:py-16 flex items-center overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center pt-16">
          <div className="space-y-6 z-10">
            <div className="space-y-2">
              <span className="eyebrow">New release by {author.name}</span>
              <h1 className="hero-title text-5xl md:text-7xl">
                {homeSettings.heroTitle} <br />
                <span className="hero-title">
                  {homeSettings.heroTitleOutline}
                </span>
              </h1>
            </div>
            <p className="hero-copy max-w-xl">{homeSettings.heroCopy}</p>
            <div className="hidden md:block">
              <BuySection />
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <img
              src="/assets/book_logo.png"
              alt="Digital Degrowth Book Cover"
              className="book-cover w-64 h-96 md:w-80 md:h-[480px] justify-self-center"
            />
            <div className="md:hidden w-full">
              <BuySection />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-band py-16 border-y">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[color:var(--accent)] shadow-xl z-10 bg-black">
              <img
                src="/assets/digital_degrowth.webp"
                alt="Digital Degrowth Logo"
                width="480"
                height="480"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-3xl md:text-5xl">{homeSettings.aboutTitle}</h2>
          </div>
          <div className="space-y-8">
            <p className="section-copy text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              {homeSettings.aboutCopy}
            </p>
            <Link
              to="/blog/what-is-digital-degrowth-a-manifesto"
              className="news-link !text-sm"
            >
              Read More <ChevronRight size={16} aria-hidden="true" />
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
              <div className="max-w-3xl mx-auto quote-frame h-auto md:min-h-[300px] flex items-center justify-center p-6 md:p-0">
                {citations && citations.length > 0 ? (
                  <>
                    {/* Desktop View: 1 Image */}
                    <div className="hidden md:block w-full">
                      <img
                        key={citationIndex}
                        src={urlFor(citations[citationIndex].image).url()}
                        alt={`Citation ${citationIndex + 1}`}
                        width="1200"
                        height="720"
                        className="w-full h-auto object-cover animate-fade"
                      />
                    </div>
                    {/* Mobile View: 3 Images Stacked */}
                    <div className="md:hidden flex flex-col gap-8 w-full items-center justify-center">
                      {Array.from({ length: Math.min(3, citations.length) }).map(
                        (_, offset) => {
                          const idx =
                            (citationIndex + offset) % citations.length;
                          return (
                            <img
                              key={`${idx}-${offset}`}
                              src={urlFor(citations[idx].image).url()}
                              alt={`Citation ${idx + 1}`}
                              className="w-full h-auto object-contain animate-fade"
                            />
                          );
                        },
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground italic">
                    No citations added yet.
                  </p>
                )}
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
                <ChevronRight
                  size={18}
                  className="mx-auto"
                  aria-hidden="true"
                />
              </button>

              <div className="flex justify-center gap-3 mt-6">
                {citations?.map((_, i) => (
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

      <section
        id="news"
        className="py-24 border-t border-border bg-[color:var(--bg-soft)]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-start mb-16 gap-4">
            <h3 className="text-3xl md:text-5xl">Latest Articles</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {articles && articles.length > 0 ? (
              articles.slice(0, 3).map((news) => (
                <Link
                  key={getArticleSlug(news)}
                  to={`/blog/${getArticleSlug(news)}`}
                  className="group block space-y-6"
                >
                  <div className="relative overflow-hidden rounded-xl border border-border bg-muted aspect-[4/3] shadow-md group-hover:shadow-xl transition-shadow">
                    <img
                      src={getArticleImage(news)}
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
              ))
            ) : (
              <div className="col-span-full py-12 text-center border border-dashed border-border rounded-xl">
                <p className="text-muted-foreground">
                  No articles published yet.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Link
              to="/blog"
              className="button-primary group !px-10 !py-5 flex items-center gap-4 shadow-xl hover:shadow-2xl transition-all !bg-black !text-[color:var(--accent)] hover:!bg-[color:var(--accent)] hover:!text-black"
            >
              <span className="text-sm font-bold uppercase tracking-[0.25em]">
                View Full Archive
              </span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-2 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="author"
        className="section-panel py-12 border-t border-[color:var(--line)]"
      >
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <h3 className="flex items-center gap-2 text-xl md:text-3xl">
              <User className="text-[color:var(--accent-deep)]" size={24} />
              The Author
            </h3>
            <p className="section-copy leading-relaxed text-base">
              {author.bio}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {author.twitter && (
                <a
                  href={author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`Follow ${author.name} on Twitter`}
                >
                  <Twitter size={18} aria-hidden="true" />
                </a>
              )}
              {author.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`Connect with ${author.name} on LinkedIn`}
                >
                  <Linkedin size={18} aria-hidden="true" />
                </a>
              )}
              {author.instagram && (
                <a
                  href={author.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`Follow ${author.name} on Instagram`}
                >
                  <Instagram size={18} aria-hidden="true" />
                </a>
              )}
              {author.facebook && (
                <a
                  href={author.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`Follow ${author.name} on Facebook`}
                >
                  <Facebook size={18} aria-hidden="true" />
                </a>
              )}
              {author.bluesky && (
                <a
                  href={author.bluesky}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`Follow ${author.name} on Bluesky`}
                >
                  <MessageSquare size={18} aria-hidden="true" />
                </a>
              )}
              {author.website && (
                <a
                  href={author.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`Visit ${author.name}'s website`}
                >
                  <Globe size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <div className="author-frame" />
              <div className="author-card flex items-center justify-center">
                {author.image ? (
                  <img
                    src={urlFor(author.image).url()}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    size={80}
                    className="text-[rgba(var(--accent-rgb),0.34)]"
                  />
                )}
                <div className="author-card__footer !py-2 !text-[10px] !bg-black !text-[color:var(--accent)]">
                  {author.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
