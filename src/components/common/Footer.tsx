import { Link, useLocation } from "react-router-dom";
import { ContactPopup } from "@/components/common/ContactPopup";
import { useSiteSettings } from "@/hooks/useSettings";

const staticSiteSettings = {
  siteTitle: "Digital Degrowth",
  footerText: "© 2025 Michael Kwet — technology in the age of survival.",
};

export const Footer = () => {
  const { settings: sanitySiteSettings } = useSiteSettings();
  const siteSettings = sanitySiteSettings || staticSiteSettings;
  const location = useLocation();
  const isBlog = location.pathname.startsWith("/blog");

  return (
    <footer
      className={`footer-shell py-12 text-center transition-colors duration-300 ${
        isBlog
          ? "bg-[color:var(--ink)] border-t border-white/5"
          : "bg-transparent border-t border-[color:var(--line)]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[color:var(--accent)] shadow-xl bg-black mb-2">
              <img
                src="/assets/digital_degrowth_text.webp"
                alt="Digital Degrowth Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`brand-mark !text-xl md:!text-3xl !tracking-[0.15em] ${
                isBlog ? "!text-white" : "text-[color:var(--ink)]"
              }`}
            >
              <span>WWW.DIGITALDEGROWTH.COM</span>
            </div>
          </div>
          <p
            className={`text-sm transition-colors duration-300 ${
              isBlog ? "text-white/60" : "text-[color:var(--ink-soft)]"
            }`}
          >
            {siteSettings.footerText}
          </p>
        </div>
      </div>
    </footer>
  );
};
