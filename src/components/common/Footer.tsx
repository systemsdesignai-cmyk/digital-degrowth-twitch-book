import { Link } from "react-router-dom";
import { ContactPopup } from "@/components/common/ContactPopup";
import { useSiteSettings } from "@/hooks/useSettings";

const staticSiteSettings = {
  siteTitle: "Digital Degrowth",
  footerText: "© 2025 Michael Kwet — technology in the age of survival.",
};

export const Footer = () => {
  const { settings: sanitySiteSettings } = useSiteSettings();
  const siteSettings = sanitySiteSettings || staticSiteSettings;

  return (
    <footer className="footer-shell py-8 text-center">
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
            <div className="brand-mark !text-xl md:!text-3xl !tracking-[0.15em]">
              <span>WWW.DIGITALDEGROWTH.COM</span>
            </div>
          </div>
          <p className="text-sm text-[color:var(--ink-soft)]">
            {siteSettings.footerText}
          </p>
          <div className="flex gap-8">
            <Link to="/blog/what-is-digital-degrowth-a-manifesto" className="footer-link">
              Manifesto
            </Link>
            <Link to="/blog" className="footer-link">
              Blog
            </Link>
            <ContactPopup />
          </div>
        </div>
      </div>
    </footer>
  );
};
