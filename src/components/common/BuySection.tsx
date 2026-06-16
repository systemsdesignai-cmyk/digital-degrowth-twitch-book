import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  ExternalLink,
  BookOpen,
  Globe,
  Book,
  Store,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useRetailers } from "@/hooks/useSettings";

const iconMap: Record<string, React.ReactNode> = {
  pluto: <Book size={16} aria-hidden="true" />,
  "amazon-us": <ShoppingCart size={16} aria-hidden="true" />,
  "amazon-eu": <ShoppingCart size={16} aria-hidden="true" />,
  barnes: <BookOpen size={16} aria-hidden="true" />,
  takealot: <ExternalLink size={16} aria-hidden="true" />,
  apple: <BookOpen size={16} aria-hidden="true" />,
  bookshop: <Store size={16} aria-hidden="true" />,
  other: <Globe size={16} aria-hidden="true" />,
};

export const BuySection = ({ lightMode = true }: { lightMode?: boolean }) => {
  const { retailers } = useRetailers();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px is Tailwind's 'sm' breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const staticEditions = [
    {
      label: "Pluto Press",
      icon: iconMap.pluto,
      url: "#",
    },
    {
      label: "Amazon (US)",
      icon: iconMap["amazon-us"],
      url: "#",
    },
    {
      label: "Amazon (Europe)",
      icon: iconMap["amazon-eu"],
      url: "#",
    },
    {
      label: "Barnes & Noble",
      icon: iconMap.barnes,
      url: "#",
    },
    {
      label: "Takealot",
      icon: iconMap.takealot,
      url: "#",
    },
    {
      label: "Apple Books",
      icon: iconMap.apple,
      url: "#",
    },
    {
      label: "Bookshop.org",
      icon: iconMap.bookshop,
      url: "#",
    },
  ];

  const allEditions =
    retailers && retailers.length > 0
      ? retailers.map((r) => ({
          label: r.label,
          icon: iconMap[r.type] || iconMap.other,
          url: r.url,
        }))
      : staticEditions;

  return (
    <div
      id="buy"
      className="flex flex-col items-start space-y-6 pt-4 animate-fade w-full"
    >
      <div className="space-y-2">
        <h2
          className={`text-2xl md:text-3xl font-display font-bold tracking-tight ${lightMode ? "text-[color:var(--ink)]" : "text-white"}`}
        >
          Purchase Options
        </h2>
        <div className="h-1 w-12 bg-[color:var(--accent)] rounded-full" />
      </div>

      <div className="flex flex-col w-full gap-3 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {allEditions.map((edition, index) => {
            const isVisible = !isMobile || index === 0 || isExpanded;
            
            return (
              <AnimatePresence key={edition.label} initial={false}>
                {isVisible && (
                  <motion.div
                    initial={isMobile && index > 0 ? { height: 0, opacity: 0 } : false}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <a
                      href={edition.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`button-primary group flex items-center gap-4 !rounded-xl !px-6 !py-4 shadow-sm transition-all hover:shadow-xl !bg-black !text-[color:var(--accent)] hover:!bg-[color:var(--accent)] hover:!text-black ${!lightMode ? "!border-white/10" : ""}`}
                    >
                      <div
                        className="flex-shrink-0 text-[color:var(--accent)] transition-colors group-hover:text-inherit"
                      >
                        {edition.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] leading-tight">
                        {edition.label}
                      </span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {allEditions.length > 1 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`sm:hidden flex items-center justify-center gap-2 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${lightMode ? "text-[color:var(--ink-soft)] hover:text-[color:var(--ink)]" : "text-white/60 hover:text-white"}`}
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp size={14} />
              </>
            ) : (
              <>
                Show All Options ({allEditions.length}) <ChevronDown size={14} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
