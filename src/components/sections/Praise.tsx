import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const citations = [
  {
    image: "/assets/qoutes/kwet1.jpg",
    response: "A powerful indictment of the status quo and a call to action.",
  },
  {
    image: "/assets/qoutes/kwet2.jpg",
    response: "Crucial reading for anyone concerned about the future of tech.",
  },
  {
    image: "/assets/qoutes/kwet3.jpg",
    response: "A roadmap for digital sovereignty in an age of surveillance.",
  },
  {
    image: "/assets/qoutes/kwet4.jpg",
    response: "Kwet's vision is both radical and necessary for our survival.",
  },
  {
    image: "/assets/qoutes/kwet5.jpg",
    response: "The manifesto we've been waiting for to reclaim our digital lives.",
  },
];

const Praise = () => {
  return (
    <section id="praise" className="py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-4">
          <p className="section-kicker text-xs font-semibold uppercase tracking-[0.32em] text-accent-warm">
            Critical praise
          </p>
        </div>

        <div className="pt-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full max-w-4xl mx-auto"
            aria-label="Critical Praise Carousel"
          >
            <CarouselContent>
              {citations.map((citation, index) => (
                <CarouselItem key={index} role="group" aria-roledescription="slide">
                  <div className="space-y-8 px-1">
                    <div className="quote-frame overflow-hidden rounded-2xl border border-border shadow-xl bg-background/50 backdrop-blur-sm">
                      <img
                        src={citation.image}
                        alt={`Citation from press image ${index + 1}`}
                        className="w-full h-auto object-cover aspect-[4/3] md:aspect-[16/9]"
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <blockquote className="font-display text-2xl md:text-3xl italic text-accent-deep leading-tight">
                        "{citation.response}"
                      </blockquote>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious 
                className="left-[-50px] bg-background/80 hover:bg-accent hover:text-accent-deep transition-colors"
                aria-label="Previous slide"
              />
              <CarouselNext 
                className="right-[-50px] bg-background/80 hover:bg-accent hover:text-accent-deep transition-colors"
                aria-label="Next slide"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Praise;
