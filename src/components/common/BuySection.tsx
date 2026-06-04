import { ShoppingCart, ExternalLink, BookOpen, Globe } from "lucide-react";
import { useRetailers } from "@/hooks/useSettings";

const iconMap: Record<string, React.ReactNode> = {
  amazon: <ShoppingCart size={16} aria-hidden="true" />,
  takealot: <ExternalLink size={16} aria-hidden="true" />,
  apple: <BookOpen size={16} aria-hidden="true" />,
  other: <Globe size={16} aria-hidden="true" />,
};

export const BuySection = () => {
  const { retailers } = useRetailers();

  const staticEditions = [
    {
      label: "Amazon",
      icon: <ShoppingCart size={16} aria-hidden="true" />,
      url: "#",
    },
    {
      label: "Takealot",
      icon: <ExternalLink size={16} aria-hidden="true" />,
      url: "#",
    },
    {
      label: "Apple Books",
      icon: <BookOpen size={16} aria-hidden="true" />,
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
