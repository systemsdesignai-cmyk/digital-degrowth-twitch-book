import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";
import { BuySection } from "@/components/common/BuySection";

type BlogFeatureSectionProps = {
  featureArticle: any; // Using any to handle both static and Sanity types for now
  topStories: any[];
};

const revealTransition = {
  duration: 0.5,
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

export function BlogFeatureSection({
  featureArticle,
  topStories,
}: BlogFeatureSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const revealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
      };

  if (!featureArticle) return null;

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between border-b border-white/10 pb-16">
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[color:var(--accent)]">Editorial Archive</p>
            <h1 className="font-display text-5xl md:text-8xl font-bold text-white tracking-[-0.04em] leading-[0.9]">
              Dispatches from the <span className="hero-outline text-[color:var(--accent)]">Resistance.</span>
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-8 text-white/60 md:text-lg italic">
            Essays and critiques on digital colonialism and platform power—recomposed into a calmer, more tactile reading experience.
          </p>
        </div>
        
        <div className="w-full xl:w-[420px] pt-4 xl:pt-0">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <BuySection lightMode={false} />
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.6fr)_minmax(19rem,0.8fr)]">
        {/* Lead Feature */}
        <motion.article transition={revealTransition} {...revealProps}>
          <Link to={`/blog/${getArticleSlug(featureArticle)}`} className="block h-full group relative">
            <Card className="overflow-hidden border-white/10 bg-white/5 py-0 shadow-2xl group-hover:border-[color:var(--accent)] transition-all duration-500 h-full">
              <CardContent className="relative p-0 h-full">
                <div className="aspect-[16/10] md:aspect-auto md:h-[36rem] overflow-hidden">
                  <img
                    src={getArticleImage(featureArticle)}
                    alt={featureArticle.title}
                    width="1600"
                    height="980"
                    fetchPriority="high"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)] via-[color:var(--ink)]/40 to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="px-2 py-0.5 bg-[color:var(--accent)] text-[color:var(--accent-deep)] text-[9px] font-bold uppercase tracking-widest rounded-sm">
                      {featureArticle.tag}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">
                      {formatArticleDate(featureArticle.date)}
                    </span>
                  </div>
                  
                  <div className="flex max-w-3xl flex-col gap-4">
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-[0.95] tracking-[-0.03em] group-hover:text-[color:var(--accent)] transition-colors">
                      {featureArticle.title}
                    </h2>
                    <p className="max-w-2xl text-sm md:text-lg leading-relaxed text-white/70 line-clamp-2 italic">
                      {featureArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[color:var(--accent)] pt-2 group-hover:gap-5 transition-all">
                      Read Feature <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.article>

        {/* Top Stories Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="pb-2 border-b border-white/10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Latest Articles</p>
          </div>
          
          {topStories.map((article, index) => (
            <motion.article
              key={`${getArticleSlug(article)}-${article.date}`}
              transition={{ ...revealTransition, delay: prefersReducedMotion ? 0 : 0.08 * (index + 1) }}
              {...revealProps}
              className="group"
            >
              <Link to={`/blog/${getArticleSlug(article)}`} className="block">
                <Card className="border-white/10 bg-white/5 shadow-xl hover:border-[color:var(--accent)] transition-all duration-300">
                  <CardContent className="flex flex-col gap-4 p-5">
                    <div className="overflow-hidden rounded-lg border border-white/5 aspect-[21/9]">
                      <img
                        src={getArticleImage(article)}
                        alt={article.title}
                        className="h-full w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[color:var(--accent)]">
                          {article.outlet}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                          {formatArticleDate(article.date)}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-[color:var(--accent)] transition-colors leading-tight uppercase tracking-tight">
                        {article.title}
                      </h3>
                      <p className="line-clamp-2 text-xs leading-relaxed text-white/50 italic">
                        {article.excerpt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
