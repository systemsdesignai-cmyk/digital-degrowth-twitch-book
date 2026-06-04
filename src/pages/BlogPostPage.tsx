import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Share2, ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/common/SEO";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useArticle, useArticles } from "@/hooks/useArticles";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading } = useArticle(slug || "");
  const { articles: allArticles } = useArticles();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[color:var(--ink)]">
        <Loader2 className="h-12 w-12 animate-spin text-[color:var(--accent)]" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-4xl font-bold font-display">Article Not Found</h1>
        <p className="text-muted-foreground">The article you are looking for does not exist or has been moved.</p>
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

      {/* Hero Section - Deep Ink for Contrast */}
      <header className="relative bg-[color:var(--ink)] pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(var(--accent-rgb),0.4),transparent_70%)]" />
          <div className="paper-grain absolute inset-0" />
        </div>
        
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/blog" 
              className="group mb-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--accent)] hover:text-white transition-colors"
            >
              <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Editorial Archive
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-[color:var(--accent)] text-[color:var(--accent-deep)] text-[10px] font-bold uppercase tracking-widest rounded-sm">
                {article.tag}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">/</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                {article.outlet}
              </span>
            </div>
            
            <h1 className="font-display text-5xl md:text-8xl font-bold text-white mb-12 leading-[0.9] tracking-[-0.04em] text-wrap-balance">
              {article.title}
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-white/40">Published</p>
                <p className="text-sm text-white font-medium">{formatArticleDate(article.date)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-white/40">Read Time</p>
                <p className="text-sm text-white font-medium">{article.readTime}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-white/40">Author</p>
                <p className="text-sm text-white font-medium">Michael Kwet</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-white/40">Source</p>
                <p className="text-sm text-white font-medium">{article.outlet}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Image Section */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 -mt-20 md:-mt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-[color:var(--ink)]">
            <img 
              src={getArticleImage(article)} 
              alt={article.title}
              className="w-full aspect-[21/9] object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
            />
          </div>
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-[11px] italic text-muted-foreground font-medium uppercase tracking-wider">
              &mdash; {getArticleCaption(article)}
            </p>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border border-border hover:bg-[color:var(--accent)] hover:border-transparent transition-all group">
                <Share2 size={16} className="text-muted-foreground group-hover:text-[color:var(--accent-deep)]" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

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
                  <p className="text-sm font-bold uppercase tracking-widest">Michael Kwet</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">Author & Activist</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Badge variant="outline" className="px-4 py-1.5 uppercase tracking-widest text-[10px] font-bold hover:bg-[color:var(--accent)] hover:border-transparent cursor-pointer transition-all">Twitter</Badge>
                <Badge variant="outline" className="px-4 py-1.5 uppercase tracking-widest text-[10px] font-bold hover:bg-[color:var(--accent)] hover:border-transparent cursor-pointer transition-all">LinkedIn</Badge>
              </div>
            </div>
          </footer>
        </article>

        {/* Right: Sidebar / Meta */}
        <aside className="hidden md:block">
          <div className="sticky top-32 space-y-12">
            <div className="space-y-4 p-6 bg-[color:var(--surface)] border border-border rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--accent-warm)]">The Manifesto</p>
              <h4 className="font-display text-xl font-bold leading-tight">Dismantle the chains of Big Tech.</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Explore the full manifesto for digital sovereignty and community-scale technology.
              </p>
              <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[color:var(--ink)] hover:gap-3 transition-all">
                Buy the book <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">More Coverage</p>
              <div className="space-y-8">
                {allArticles.filter(a => a.slug.current !== slug).slice(0, 2).map(a => (
                  <Link key={a.slug.current} to={`/blog/${a.slug.current}`} className="block space-y-2 group">
                    <p className="text-[10px] uppercase tracking-widest text-[color:var(--accent-warm)] font-bold">{a.outlet}</p>
                    <h5 className="font-display text-lg font-bold group-hover:text-[color:var(--accent-warm)] transition-colors leading-tight">{a.title}</h5>
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
