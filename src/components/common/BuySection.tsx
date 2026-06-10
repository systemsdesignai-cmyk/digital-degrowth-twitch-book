import {
  ShoppingCart,
  ExternalLink,
  BookOpen,
  Globe,
  Book,
  Store,
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

  const editions =
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
      className="flex flex-col items-start space-y-6 pt-4 animate-fade"
    >
      <div className="space-y-2">
        <h2
          className={`text-2xl md:text-3xl font-display font-bold tracking-tight ${lightMode ? "text-[color:var(--ink)]" : "text-white"}`}
        >
          Purchase Options
        </h2>
        <div className="h-1 w-12 bg-[color:var(--accent)] rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {editions.map((edition) => (
          <a
            key={edition.label}
            href={edition.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`button-primary group flex items-center gap-4 !rounded-xl !px-6 !py-4 shadow-sm transition-all hover:shadow-xl ${!lightMode ? "!border-white/10 !bg-white/5 !text-white hover:!bg-[color:var(--accent)] hover:!text-[color:var(--accent-deep)]" : ""}`}
          >
            <div
              className={`flex-shrink-0 ${lightMode ? "opacity-70" : "text-[color:var(--accent)] transition-colors group-hover:text-inherit"}`}
            >
              {edition.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] leading-tight">
              {edition.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
