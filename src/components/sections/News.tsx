import React from "react";
import { motion } from "framer-motion";
import { Newspaper, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  {
    date: "March 12, 2024",
    title: "The Digital Commons: Reclaiming the Tools of Production",
    outlet: "People's Tech",
    image: "/assets/articles/cloud-degrowth.svg",
    caption:
      "A vision for community-owned infrastructure and collaborative labor.",
  },
];

const News = () => {
  return (
    <section id="news" className="py-10 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12 gap-6">
          <div className="space-y-3">
            <p className="section-kicker text-xs font-semibold uppercase tracking-[0.32em] text-accent-warm">
              Coverage
            </p>
            <h3 className="section-heading flex items-center gap-3 text-3xl md:text-4xl font-display font-semibold text-ink text-balance">
              <Newspaper className="text-accent-deep size-8" aria-hidden="true" />
              Latest Articles
            </h3>
          </div>
          <a
            href="#"
            className="news-link inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-deep hover:text-accent transition-colors"
          >
            All articles <ChevronRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {latestArticles.map((news, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm hover:border-accent/40 transition-all duration-500 hover:shadow-2xl rounded-2xl">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-[0.8] group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <Badge className="bg-accent text-accent-deep font-display text-lg px-3 py-1 rounded-lg">
                      {news.outlet}
                    </Badge>
                    <p className="text-white/80 text-[10px] leading-relaxed font-medium tracking-wide">
                      {news.caption}
                    </p>
                  </div>
                </div>
                <CardHeader className="pt-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent-warm font-bold">
                    {news.date}
                  </p>
                  <h4 className="text-xl md:text-2xl font-semibold leading-snug group-hover:text-accent-deep transition-colors text-pretty">
                    {news.title}
                  </h4>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
