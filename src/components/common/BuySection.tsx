import { ShoppingCart, ExternalLink, BookOpen, Globe, Book, Store } from "lucide-react";
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

export const BuySection = () => {
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

  const editions = (retailers && retailers.length > 0)
    ? retailers.map(r => ({
        label: r.label,
        icon: iconMap[r.type] || iconMap.other,
        url: r.url,
      }))
    : staticEditions;

  return (
    <div
      id="buy"
      className="flex flex-col items-start space-y-6 pt-8 animate-fade"
    >
      <div className="space-y-1">
        <h2 className="text-3xl md:text-4xl">Buy the book</h2>
        <p className="text-xs italic text-[color:var(--ink-soft)] font-medium">
          Available now at these retailers
        </p>
      </div>

      <div className="flex flex-wrap gap-3 w-full max-w-lg">
        {editions.map((edition) => (
          <a
            key={edition.label}
            href={edition.url}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary !py-3 !px-6 !rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-2"
          >
            {edition.icon}
            {edition.label}
          </a>
        ))}
      </div>
    </div>
  );
};
