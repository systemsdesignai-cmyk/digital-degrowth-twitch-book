import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isStudio = location.pathname.startsWith("/studio");

  // Handle scroll to hash on route change or scroll to top
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Use a small timeout to ensure the element is in the DOM after a route change
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  if (isStudio) {
    return <main className="!p-0 !m-0">{children}</main>;
  }

  return (
    <div className="app-shell min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="ambient-wash absolute inset-0" />
        <div className="paper-grain absolute inset-0" />
      </div>

      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" className="main-shell">
        {children}
      </main>

      <Footer />
    </div>
  );
};
