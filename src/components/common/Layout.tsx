import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children?: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: 20,
    rotateY: -5,
  },
  animate: {
    opacity: 1,
    x: 0,
    rotateY: 0,
  },
  exit: {
    opacity: 0,
    x: -20,
    rotateY: 5,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isStudio = location.pathname.startsWith("/studio");
  const content = children ?? <Outlet />;

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
    return <main className="!p-0 !m-0">{content}</main>;
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

      <main id="main-content" className="main-shell overflow-x-hidden" style={{ perspective: "1200px" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            style={{ transformOrigin: "center left" }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};
