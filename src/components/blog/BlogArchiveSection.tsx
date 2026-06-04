import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

type BlogArchiveSectionProps = {
  articles: any[];
  currentPage: number;
  pageSize: number;
};

const archiveCardTransition = {
  duration: 0.45,
  ease: "easeOut" as const,
};

const getArticleSlug = (article: any) => {
  return typeof article.slug === 'string' ? article.slug : article.slug.current;
};

const getArticleImage = (article: any) => {
  if (typeof article.image === 'string') return article.image;
  return urlFor(article.image).url();
};

const formatArticleDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export function BlogArchiveSection({
  articles,
  currentPage,
  pageSize,
}: BlogArchiveSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const totalPages = Math.max(1, Math.ceil(articles.length / pageSize));
  const safePage = Math.min(Math.max(currentPage, 0), totalPages - 1);
  const pageStartIndex = safePage * pageSize;
  const visibleArticles = articles.slice(pageStartIndex, pageStartIndex + pageSize);
  const rangeStart = pageStartIndex + 1;
  const rangeEnd = pageStartIndex + visibleArticles.length;
  const pageLinks = Array.from({ length: totalPages }, (_, index) => index);
  const revealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-white/40 px-6 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:items-center">
          <span className="text-[color:var(--ink)]">Total {articles.length} Dispatches</span>
          <Separator className="hidden md:block md:w-8" />
          <span>
            Displaying {rangeStart}-{rangeEnd}
          </span>
          <Separator className="hidden md:block md:w-8" />
          <span>Newest First</span>
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {visibleArticles.map((article, index) => (
          <motion.article
            key={`${getArticleSlug(article)}-${article.date}`}
            transition={{
              ...archiveCardTransition,
              delay: prefersReducedMotion ? 0 : index * 0.08,
            }}
            {...revealProps}
            className="group"
          >
            <Link to={`/blog/${getArticleSlug(article)}`} className="block h-full">
              <div className="flex flex-col h-full space-y-6">
                <div className="relative overflow-hidden rounded-xl border border-border bg-muted aspect-[16/9] shadow-md transition-shadow group-hover:shadow-xl">
                  <img
                    src={getArticleImage(article)}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-[color:var(--ink)] text-white text-[9px] font-bold uppercase tracking-widest rounded-sm">
                      {article.tag}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[color:var(--accent-warm)]">
                      {article.outlet}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      {formatArticleDate(article.date)}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-3xl font-bold text-[color:var(--ink)] leading-[1.1] tracking-tight group-hover:text-[color:var(--accent-warm)] transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-[color:var(--ink-soft)] italic line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    {article.readTime}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[color:var(--ink)] group-hover:gap-4 transition-all">
                    Read Dispatch <ArrowRight size={14} className="text-[color:var(--accent-warm)]" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 flex justify-center py-12 border-t border-border">
        <div className="flex flex-col items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground italic">
            Navigating page {safePage + 1} of {totalPages}
          </p>
          <Pagination className="mx-0 w-auto">
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious
                  to={`/blog?page=${Math.max(1, safePage)}`}
                  className={cn(
                    "rounded-full border border-border px-6 hover:bg-[color:var(--accent)] hover:border-transparent transition-all",
                    safePage === 0 && "pointer-events-none opacity-45"
                  )}
                />
              </PaginationItem>
              {pageLinks.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    to={`/blog?page=${page + 1}`}
                    isActive={page === safePage}
                    className={cn(
                      "rounded-full border border-border w-10 h-10 hover:bg-[color:var(--accent)] hover:border-transparent transition-all",
                      page === safePage && "bg-[color:var(--ink)] text-white border-transparent"
                    )}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  to={`/blog?page=${Math.min(totalPages, safePage + 2)}`}
                  className={cn(
                    "rounded-full border border-border px-6 hover:bg-[color:var(--accent)] hover:border-transparent transition-all",
                    safePage === totalPages - 1 && "pointer-events-none opacity-45"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
