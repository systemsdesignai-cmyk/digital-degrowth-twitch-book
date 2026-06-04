import { Link } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";
import { SEO } from "@/components/common/SEO";

export const NotFoundPage = () => {
  return (
    <>
      <SEO title="404 - Page Not Found" />
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <div className="space-y-8 max-w-lg">
          <div className="relative">
             <h1 className="text-[12rem] md:text-[16rem] font-display leading-none opacity-[0.03] select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="hero-title text-4xl md:text-5xl">
                Page <span className="hero-outline">Not Found</span>
              </h2>
            </div>
          </div>
          
          <p className="section-copy text-lg md:text-xl text-[color:var(--ink-soft)] italic">
            "The signal you are looking for has been lost in the digital noise."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link 
              to="/" 
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-[color:var(--ink)] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[color:var(--accent-deep)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Home size={14} className="group-hover:scale-110 transition-transform" />
              Return Home
            </Link>
            
            <Link 
              to="/blog" 
              className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-[color:var(--ink)] text-[color:var(--ink)] text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[color:var(--ink)] hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Visit Archive
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
