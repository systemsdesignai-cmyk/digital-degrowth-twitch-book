import { Mail, Twitter, Globe, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthor } from "@/hooks/useSettings";

export function ContactPopup() {
  const { author, loading } = useAuthor();

  if (loading || !author) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="footer-link">Contact</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[color:var(--bg)] border-[color:var(--line)]">
        <DialogHeader>
          <DialogTitle className="hero-title text-2xl">
            Contact <span className="hero-outline">{author.name.split(' ')[0]}</span>
          </DialogTitle>
          <DialogDescription className="section-copy text-sm italic">
            "Direct communication in an age of surveillance."
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 py-6">
          {author.email && (
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[color:var(--bg-soft)] border border-[color:var(--line)] transition-colors hover:border-[color:var(--accent)] group">
              <div className="p-2 rounded-full bg-[color:var(--accent)] text-[color:var(--ink)] group-hover:scale-110 transition-transform">
                <Mail size={18} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--ink-soft)]">Email</p>
                <a href={`mailto:${author.email}`} className="text-lg hover:text-[color:var(--accent-warm)] transition-colors">
                  {author.email}
                </a>
              </div>
            </div>
          )}

          {author.contactInfo && (
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[color:var(--bg-soft)] border border-[color:var(--line)]">
              <div className="p-2 rounded-full bg-[color:var(--ink)] text-white">
                <MessageSquare size={18} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--ink-soft)]">Additional Info</p>
                <p className="section-copy text-sm leading-relaxed">
                  {author.contactInfo}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-center gap-8 pt-4 border-t border-[color:var(--line)]">
            {author.twitter && (
              <a 
                href={author.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center gap-2 text-[color:var(--ink-soft)] hover:text-[color:var(--accent-warm)] transition-colors"
              >
                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Twitter</span>
              </a>
            )}
            {author.website && (
              <a 
                href={author.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center gap-2 text-[color:var(--ink-soft)] hover:text-[color:var(--accent-warm)] transition-colors"
              >
                <Globe size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Website</span>
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
