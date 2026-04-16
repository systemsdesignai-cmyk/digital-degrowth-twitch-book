import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ShoppingCart, 
  ChevronRight, 
  Quote, 
  Newspaper, 
  User, 
  ExternalLink,
  Github,
  Twitter,
  Globe
} from 'lucide-react';

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono selection:bg-green-900 selection:text-green-100">
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black"></div>
        <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-green-900/50 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <span className="bg-green-500 text-black px-1">DIGITAL</span>
            <span>DEGROWTH</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
            {['About', 'Quotes', 'News', 'Author'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
          <button className="bg-green-500 text-black px-4 py-2 text-xs font-bold hover:bg-green-400 transition-colors uppercase tracking-widest">
            Buy Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="space-y-2">
              <span className="text-green-500 font-bold tracking-widest text-sm inline-block border-l-4 border-green-500 pl-4 mb-4">
                NEW RELEASE BY MIKE KWET
              </span>
              <h1 className="text-5xl md:text-7xl font-black leading-none text-white">
                RECLAIM THE <br />
                <span className="text-transparent border-text stroke-green-500" style={{ WebkitTextStroke: '1px #4ade80' }}>FUTURE.</span>
              </h1>
            </div>
            <p className="text-lg text-green-300/80 max-w-lg leading-relaxed">
              A manifesto for dismantling digital colonialism and building a technology stack that serves the people, not the empire.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center gap-2 bg-green-500 text-black px-8 py-4 font-bold hover:scale-105 transition-transform">
                <ShoppingCart size={20} />
                AMAZON
              </button>
              <button className="flex items-center gap-2 border border-green-500 text-green-500 px-8 py-4 font-bold hover:bg-green-500/10 transition-colors">
                TAKEALOT
                <ExternalLink size={18} />
              </button>
            </div>
          </div>

          {/* Book Mockup Overlay */}
          <div className="relative flex justify-center items-center perspective-1000">
            <div className="w-64 h-96 md:w-80 md:h-[480px] bg-green-500 shadow-[20px_20px_60px_-15px_rgba(74,222,128,0.3)] rotate-12 hover:rotate-0 transition-transform duration-700 ease-out relative group overflow-hidden cursor-pointer">
              {/* Spine edge */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-green-600"></div>
              {/* Cover Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between items-center text-black">
                <div className="w-full border-t-4 border-black pt-4">
                  <p className="text-xs font-bold tracking-[0.3em]">A MANIFESTO</p>
                </div>
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-2">DIGITAL</h2>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">DEGROWTH</h2>
                </div>
                <div className="w-full border-b-4 border-black pb-4 text-center">
                  <p className="text-lg font-bold">MIKE KWET</p>
                </div>
              </div>
              {/* Grain/Texture Overlay */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-dark.png')]"></div>
            </div>
            {/* Background elements for depth */}
            <div className="absolute -z-10 w-full h-full bg-green-500/5 blur-3xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section id="about" className="py-24 border-y border-green-900/30 bg-green-900/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="inline-block p-3 bg-green-500/10 rounded-full">
            <BookOpen className="text-green-500" size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">The Core Thesis</h2>
          <p className="text-xl md:text-2xl text-green-300 leading-relaxed italic font-serif">
            "We must unlearn the obsession with infinite digital expansion. True freedom lies in decentralized, human-scale infrastructure that respects the ecology of our planet and the sovereignty of our minds."
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left pt-12">
            {[
              { title: "Dismantle", desc: "Break the chains of Big Tech dominance and digital colonialism." },
              { title: "Scale Down", desc: "Prioritize local, resilient networks over global surveillance grids." },
              { title: "Reclaim", desc: "Return the ownership of data and tools to the community." }
            ].map((box, i) => (
              <div key={i} className="p-6 border border-green-900/50 hover:border-green-500 transition-colors">
                <h4 className="font-bold text-green-500 mb-2 uppercase tracking-tighter">{box.title}</h4>
                <p className="text-sm text-green-300/60 leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section id="quotes" className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-xs font-bold tracking-[0.5em] text-green-500 mb-12 uppercase text-center underline decoration-green-500 underline-offset-8">Critical Praise</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { text: "This book is a vital corrective to the tech-optimist delusion. A roadmap for a habitable future.", author: "Shoshana Zuboff", role: "Author of The Age of Surveillance Capitalism" },
              { text: "Mike Kwet provides the most profound critique of digital colonialism I've ever read. Essential reading.", author: "Rudy Walker", role: "Tech Empire Correspondent" },
              { text: "A provocative call to action that refuses to accept the status quo of Silicon Valley's empire.", author: "The People's Tech", role: "Editorial Board" },
              { text: "Kwet doesn't just identify the problem; he gives us the vocabulary for resistance.", author: "Digital Justice Lab", role: "Policy Group" }
            ].map((q, i) => (
              <div key={i} className="p-10 bg-green-900/10 border-l-2 border-green-500 relative">
                <Quote className="absolute top-4 right-4 text-green-900/40" size={40} />
                <p className="text-lg text-white mb-6 leading-relaxed">"{q.text}"</p>
                <div>
                  <p className="font-bold text-green-500">{q.author}</p>
                  <p className="text-xs text-green-300/50 uppercase tracking-widest">{q.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In The News / Dynamic Content */}
      <section id="news" className="py-24 border-t border-green-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="flex items-center gap-2 text-2xl font-bold text-white uppercase">
                <Newspaper className="text-green-500" />
                In The News
              </h3>
            </div>
            <a href="#" className="text-xs text-green-500 flex items-center gap-1 hover:underline">
              ALL ARTICLES <ChevronRight size={14} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { date: "June 20, 2024", title: "Digital Degrowth: Can we survive without the Cloud?", outlet: "The Guardian" },
              { date: "May 15, 2024", title: "Unmasking Digital Colonialism in Lebanon", outlet: "People's Tech" },
              { date: "April 02, 2024", title: "Why the Silicon Valley Bank Run matters for Degrowth", outlet: "Tech Empire" }
            ].map((news, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="h-48 bg-green-900/20 mb-4 border border-green-900/50 flex items-center justify-center group-hover:bg-green-500/10 transition-colors">
                  <div className="text-4xl font-black text-green-900/20 group-hover:text-green-500/20">{news.outlet}</div>
                </div>
                <p className="text-xs text-green-500 mb-2">{news.date} — {news.outlet}</p>
                <h4 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">{news.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section id="author" className="py-24 bg-green-900/5 border-t border-green-900/30">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <h3 className="flex items-center gap-2 text-2xl font-bold text-white uppercase">
              <User className="text-green-500" />
              The Author
            </h3>
            <p className="text-green-300/80 leading-relaxed text-lg">
              Mike Kwet is a leading researcher and activist focused on digital colonialism and the political economy of the internet. His work spans journalism, academia, and grassroots organizing, consistently challenging the hegemony of global tech giants.
            </p>
            <p className="text-green-300/80 leading-relaxed">
              Based between the US and South Africa, Mike has been a vocal proponent of "People's Tech" — a vision for technology that empowers communities rather than exploiting them.
            </p>
            <div className="flex gap-4 pt-4">
              <Twitter className="text-green-500 hover:text-white cursor-pointer" />
              <Github className="text-green-500 hover:text-white cursor-pointer" />
              <Globe className="text-green-500 hover:text-white cursor-pointer" />
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 border-2 border-green-500 translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center overflow-hidden">
                 {/* Placeholder for author photo */}
                 <User size={120} className="text-green-500/40" />
                 <div className="absolute bottom-0 left-0 right-0 bg-green-500 p-2 text-center text-black text-xs font-bold uppercase tracking-widest">
                   Mike Kwet
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-green-900/30 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <div className="text-xl font-bold tracking-tighter">
              <span className="bg-green-500 text-black px-1">DIGITAL</span>
              <span>DEGROWTH</span>
            </div>
            <p className="text-xs text-green-300/40 uppercase tracking-[0.2em]">
              © 2025 MIKE KWET • ALL TOOLS RECLAIMED • CC BY 4.0
            </p>
            <div className="flex gap-8 text-xs text-green-500 font-bold uppercase underline-offset-4 decoration-green-900">
               <a href="#" className="hover:underline">Manifesto</a>
               <a href="#" className="hover:underline">People's Tech</a>
               <a href="#" className="hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
