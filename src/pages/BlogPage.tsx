import { BlogArchiveSection } from "@/components/blog/BlogArchiveSection";
import { BlogFeatureSection } from "@/components/blog/BlogFeatureSection";
import { SEO } from "@/components/common/SEO";
import { useArticles } from "@/hooks/useArticles";
import { Loader2 } from "lucide-react";

type BlogPageProps = {
  currentPage: number;
  pageSize: number;
};

export function BlogPage({ currentPage, pageSize }: BlogPageProps) {
  const { articles, loading } = useArticles();
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[color:var(--ink)]">
        <Loader2 className="h-12 w-12 animate-spin text-[color:var(--accent)]" />
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[color:var(--ink)] text-white gap-4">
        <h1 className="text-2xl font-display">No dispatches found.</h1>
        <p className="text-white/60">Check back later for new updates.</p>
      </div>
    );
  }
  
  const [featureArticle, ...archiveArticles] = articles;
  const topStories = archiveArticles.slice(0, 2);
  const paginatedArchiveArticles = archiveArticles.slice(2);

  return (
    <section className="blog-page">
      <SEO 
        title="Editorial Archive" 
        description="Further reading and dispatches on digital colonialism, degrowth, and sovereign technology."
      />
      <div className="bg-[color:var(--ink)] pt-16 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(var(--accent-rgb),0.3),transparent_70%)]" />
          <div className="paper-grain absolute inset-0" />
        </div>
        
        <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 py-28 md:py-32 relative z-10">
          <BlogFeatureSection
            featureArticle={featureArticle as any}
            topStories={topStories as any}
          />
        </div>
      </div>

      <div className="blog-archive-shell">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:py-24">
          <div className="flex flex-col gap-4 border-b border-border pb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[color:var(--accent-warm)]">Archive</p>
            <h2 className="text-4xl md:text-5xl tracking-tight">Further Reading</h2>
          </div>
          <BlogArchiveSection
            articles={paginatedArchiveArticles as any}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>
      </div>
    </section>
  );
}
