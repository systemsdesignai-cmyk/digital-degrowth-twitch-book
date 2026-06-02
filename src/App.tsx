import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Praise from "@/components/sections/Praise";
import News from "@/components/sections/News";
import Author from "@/components/sections/Author";
import Footer from "@/components/layout/Footer";

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-shell min-h-screen selection:bg-accent/30 selection:text-accent-deep">
      {/* Foundational UI Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="ambient-wash absolute inset-0" />
        <div className="paper-grain absolute inset-0 opacity-[0.08]" />
      </div>

      <Navbar scrolled={scrolled} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Praise />
        <News />
        <Author />
      </main>

      <Footer />
    </div>
  );
};

export default App;
