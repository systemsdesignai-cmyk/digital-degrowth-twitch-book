import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-band py-12 border-y bg-accent/5">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="size-32 md:size-48 rounded-full overflow-hidden border-2 border-accent shadow-2xl bg-black ring-8 ring-accent/10">
            <img
              src="/assets/image1.webp"
              alt="Digital Degrowth Logo"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
        </motion.div>

        <div className="space-y-4">
          <p className="section-kicker text-xs font-semibold uppercase tracking-[0.32em] text-accent-warm">
            Definition
          </p>
          <h2 className="section-heading text-4xl md:text-6xl font-display font-semibold text-ink tracking-tight text-balance">
            What is Digital Degrowth?
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="font-display text-xl md:text-2xl text-ink leading-relaxed italic max-w-3xl mx-auto space-y-6 text-pretty">
            <p>
              Digital Degrowth is a movement and framework aimed at dismantling
              the extractive structures of Big Tech and digital colonialism. It
              advocates for the radical downscaling of global surveillance
              infrastructure in favor of local, resilient, and community-owned
              networks. By prioritizing human well-being and ecological limits
              over infinite capital expansion, it seeks to reclaim technology as
              a public good.
            </p>
            <p>
              This paradigm shift requires us to unlearn the obsession with
              "more" and instead embrace "enough," fostering a culture of repair
              and maintenance. Sovereign data practices and decentralized
              protocols are central to this vision, ensuring that digital tools
              serve the people rather than the empire. Ultimately, Digital
              Degrowth is about building a technology stack that respects our
              cognitive sovereignty and the material reality of our planet.
            </p>
          </div>
          <a
            href="#"
            className="news-link inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-deep hover:text-accent transition-colors"
          >
            Read more <ChevronRight className="size-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
