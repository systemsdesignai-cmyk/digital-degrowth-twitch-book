import { useAuthor } from "@/hooks/useSettings";
import { SEO } from "@/components/common/SEO";
import { Mail, Globe, Twitter, Linkedin, MessageSquare, Loader2, Send } from "lucide-react";
import { useState } from "react";

export const ContactPage = () => {
  const { author, loading } = useAuthor();
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[color:var(--bg)]">
        <Loader2 className="h-12 w-12 animate-spin text-[color:var(--accent-warm)]" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="animate-fade">
      <SEO title="Contact" description="Get in touch with Michael Kwet regarding Digital Degrowth." />
      
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Get in Touch</h1>
          <p className="text-lg text-muted-foreground italic max-w-2xl">
            For inquiries regarding the book, speaking engagements, or research collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl">Contact Details</h2>
            <p className="section-copy">
              Michael Kwet is a researcher and activist based in South Africa and the United States. You can reach him through the following channels:
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="icon-chip !w-12 !h-12">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                <a href="mailto:michaelkwet@protonmail.com" className="text-lg font-bold hover:text-[color:var(--accent-warm)] transition-colors">
                  michaelkwet@protonmail.com
                </a>
              </div>
            </div>

            {author?.website && (
              <div className="flex items-start gap-4">
                <div className="icon-chip !w-12 !h-12">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Website</p>
                  <a href={author.website} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-[color:var(--accent-warm)] transition-colors">
                    {author.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Social Networks</p>
            <div className="flex flex-wrap gap-4">
              {author?.twitter && (
                <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              )}
              {author?.linkedin && (
                <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
              )}
              {author?.bluesky && (
                <a href={author.bluesky} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Bluesky">
                  <MessageSquare size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="section-panel p-8 md:p-12 rounded-3xl border border-border shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-[color:var(--accent)] text-[color:var(--accent-deep)] rounded-full flex items-center justify-center mx-auto">
                <Send size={32} />
              </div>
              <h3 className="text-2xl font-bold">Message Sent!</h3>
              <p className="text-muted-foreground italic">
                Thank you for reaching out. Michael will get back to you as soon as possible.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold uppercase tracking-widest text-[color:var(--accent-warm)] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    required
                    id="name"
                    type="text" 
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 focus:border-[color:var(--accent-warm)] focus:ring-0 transition-all outline-none"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    required
                    id="email"
                    type="email" 
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 focus:border-[color:var(--accent-warm)] focus:ring-0 transition-all outline-none"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-widest ml-1">Subject</label>
                <input 
                  required
                  id="subject"
                  type="text" 
                  placeholder="Inquiry regarding..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 focus:border-[color:var(--accent-warm)] focus:ring-0 transition-all outline-none"
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest ml-1">Your Message</label>
                <textarea 
                  required
                  id="message"
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white/50 focus:border-[color:var(--accent-warm)] focus:ring-0 transition-all outline-none resize-none"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
              </div>
              <button 
                disabled={isSubmitting}
                className="button-primary w-full !py-4 !rounded-xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};
