import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/common/SEO";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useArticle, useArticles } from "@/hooks/useArticles";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { useAuthor } from "@/hooks/useSettings";
import {
  ChevronRight,
  Globe,
  Newspaper,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  MessageSquare,
  User,
  ChevronLeft,
  Share2,
  ArrowRight,
  Loader2,
  Home,
} from "lucide-react";

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading: articlesLoading } = useArticle(slug || "");
  const { articles: allArticles } = useArticles();
  const { author, loading: authorLoading } = useAuthor();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const isLoading = articlesLoading || authorLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[color:var(--ink)]">
        <Loader2 className="h-12 w-12 animate-spin text-[color:var(--accent)]" />
      </div>
    );
  }

  if (!article || !author) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-4xl font-bold font-display">Article Not Found</h1>
        <p className="text-muted-foreground">
          The article you are looking for does not exist or has been moved.
        </p>
        <Link to="/blog" className="button-primary !py-3 !px-6 !rounded-xl">
          Back to Blog
        </Link>
      </div>
    );
  }

  const getArticleImage = (art: any) => {
    if (!art.image) return "";
    return urlFor(art.image).url();
  };

  const getArticleCaption = (art: any) => {
    return art.image?.caption;
  };

  return (
    <div className="animate-fade">
      <SEO
        title={article.title}
        description={article.excerpt}
        image={getArticleImage(article)}
        type="article"
        publishedDate={article.date}
      />
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[color:var(--accent)] z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Split Hero Section */}
      <header className="relative bg-[color:var(--ink)] min-h-[70vh] flex flex-col md:flex-row overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--accent-rgb),0.3),transparent_60%)]" />
          <div className="paper-grain absolute inset-0" />
        </div>

        {/* Left Side: Content */}
        <div className="relative flex-1 flex flex-col justify-center px-6 py-20 md:py-32 md:px-12 lg:px-24 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-6 mb-12">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[color:var(--accent)] hover:text-white transition-colors"
              >
                <Home
                  size={12}
                  className="transition-transform group-hover:-translate-y-0.5"
                />
                Home
              </Link>
              <span className="text-white/20 hidden sm:block">|</span>
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[color:var(--accent)] hover:text-white transition-colors"
              >
                <ChevronLeft
                  size={12}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Archive
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-[color:var(--accent)] text-[color:var(--accent-deep)] text-[10px] font-bold uppercase tracking-widest rounded-sm">
                {article.tag}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                /
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                {article.outlet}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-10 leading-[0.95] tracking-[-0.04em] text-wrap-balance">
              {article.title}
            </h1>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 max-w-xl">
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">
                  Published
                </p>
                <p className="text-xs text-white font-medium">
                  {formatArticleDate(article.date)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">
                  Read Time
                </p>
                <p className="text-xs text-white font-medium">
                  {article.readTime}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Image */}
        <div className="relative flex-1 md:h-auto h-[40vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--ink)] to-transparent z-10 hidden md:block w-32" />
            <img
              src={getArticleImage(article)}
              alt={article.title}
              className="w-full h-full object-cover opacity-80"
            />
            {getArticleCaption(article) && (
              <div className="absolute bottom-6 right-6 z-20 hidden md:block">
                <p className="text-[9px] italic text-white/40 font-medium uppercase tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                  &mdash; {getArticleCaption(article)}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {/* Content Section */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-32 grid md:grid-cols-[1fr_240px] gap-16">
        {/* Left: Article Body */}
        <article>
          <div className="mb-12">
            <p className="font-display text-2xl md:text-3xl text-[color:var(--ink)] leading-relaxed italic border-l-4 border-[color:var(--accent)] pl-8 py-2">
              {article.excerpt}
            </p>
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-display prose-headings:font-bold prose-headings:text-[color:var(--ink)]
            prose-p:text-[color:var(--ink-soft)] prose-p:leading-[1.8] prose-p:mb-8
            prose-a:text-[color:var(--accent-warm)] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[color:var(--ink)] prose-strong:font-bold"
          >
            <PortableText value={article.content} />
          </div>

          <footer className="mt-24 pt-12 border-t border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[color:var(--ink)] flex items-center justify-center text-white">
                  MK
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest">
                    Michael Kwet
                  </p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
                    Author & Activist
                  </p>
                </div>
              </div>
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

              {/*<div className="flex gap-4">
                <Badge
                  variant="outline"
                  className="px-4 py-1.5 uppercase tracking-widest text-[10px] font-bold hover:bg-[color:var(--accent)] hover:border-transparent cursor-pointer transition-all"
                >
                  Twitter
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-1.5 uppercase tracking-widest text-[10px] font-bold hover:bg-[color:var(--accent)] hover:border-transparent cursor-pointer transition-all"
                >
                  LinkedIn
                </Badge>
              </div>*/}
            </div>
          </footer>
        </article>

        {/* Right: Sidebar / Meta */}
        <aside className="hidden md:block">
          <div className="sticky top-32 space-y-12">
            <div className="space-y-4 p-6 bg-[color:var(--surface)] border border-border rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--accent-warm)]">
                The Manifesto
              </p>
              <h4 className="font-display text-xl font-bold leading-tight">
                What is Digital Degrowth? A Manifesto
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Explore the full manifesto for digital sovereignty and
                community-scale technology.
              </p>
              <Link
                to="/blog/what-is-digital-degrowth-a-manifesto"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[color:var(--ink)] hover:gap-3 transition-all"
              >
                Read the Manifesto <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                More Coverage
              </p>
              <div className="space-y-8">
                {allArticles
                  .filter((a) => a.slug.current !== slug)
                  .slice(0, 2)
                  .map((a) => (
                    <Link
                      key={a.slug.current}
                      to={`/blog/${a.slug.current}`}
                      className="block space-y-2 group"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-[color:var(--accent-warm)] font-bold">
                        {a.outlet}
                      </p>
                      <h5 className="font-display text-lg font-bold group-hover:text-[color:var(--accent-warm)] transition-colors leading-tight">
                        {a.title}
                      </h5>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
