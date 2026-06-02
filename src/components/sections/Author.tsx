import React from "react";
import { motion } from "framer-motion";
import { User, Twitter, Github, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Author = () => {
  return (
    <section id="author" className="section-panel py-10 border-t border-border bg-accent/5">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 md:order-1 space-y-6"
        >
          <div className="space-y-3">
            <p className="section-kicker text-xs font-semibold uppercase tracking-[0.32em] text-accent-warm">
              Profile
            </p>
            <h3 className="section-heading flex items-center gap-3 text-3xl md:text-4xl font-display font-semibold text-ink text-balance">
              <User className="text-accent-deep size-8" aria-hidden="true" />
              The Author
            </h3>
          </div>
          <div className="space-y-4">
            <p className="section-copy leading-relaxed text-lg text-ink-soft text-pretty">
              Michael Kwet is a leading researcher and activist focused on
              digital colonialism and the political economy of the internet. His
              work spans journalism, academia, and grassroots organizing,
              consistently challenging the hegemony of global tech giants.
            </p>
            <p className="section-copy leading-relaxed text-ink-soft text-pretty">
              Based between the US and South Africa, Michael has been a vocal
              proponent of "People&apos;s Tech" - a vision for technology that
              empowers communities rather than exploiting them.
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            {[Twitter, Github, Globe].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -3, scale: 1.1 }}
                href="#"
                className="p-3 rounded-full border border-accent/20 bg-background shadow-sm text-accent-warm hover:text-accent-deep hover:border-accent transition-colors"
                aria-label={`Link to Michael Kwet's social media profile ${i + 1}`}
              >
                <Icon className="size-5" aria-hidden="true" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative size-64 md:size-80">
            <div className="absolute inset-0 border-2 border-accent/20 rounded-3xl translate-x-4 translate-y-4" />
            <div className="author-card relative size-full overflow-hidden rounded-3xl border border-border shadow-2xl bg-gradient-to-br from-background to-accent/5 flex items-center justify-center">
              <User size={160} className="text-accent/30" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-accent/90 backdrop-blur-md text-accent-deep text-center text-[10px] font-bold tracking-[0.24em] uppercase">
                Michael Kwet
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Author;
