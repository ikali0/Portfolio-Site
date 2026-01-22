/**
 * Contact Section Component
 * 
 * A retro Windows-styled contact section with:
 * - Contact form with EmailJS integration
 * - Social links and quick contact options
 * - Services list
 */
import { Mail, Linkedin, Download, ExternalLink } from "lucide-react";
import ContactForm from "./ContactForm";
const Contact = () => {
  const services = ["Full-stack web development", "AI/ML integration & consulting", "Technical architecture & code review", "UI/UX design implementation"];
  return <section id="contact" className="py-24 px-4 pb-32 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-widest text-accent font-medium mb-3 text-center">
          ​Contact Me  
        </p>
        
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-center text-sm">
          I'm currently open to freelance projects and full-time opportunities.
          Let's talk about how I can help bring your ideas to life.
        </p>

        <div className="shadow-sm">
          {/* Contact Form Window */}
          <div className="retro-window">
            <div className="retro-title-bar">
              <span className="font-bold text-xs">Get In Touch   </span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-secondary" />
                <div className="w-3 h-3 rounded-sm bg-accent" />
              </div>
            </div>
            <div className="p-4 rounded-sm shadow-sm opacity-80 px-[8px] py-[8px] bg-fuchsia-200">
              <ContactForm />
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Services Window */}
            <div className="retro-window-small">
              <div className="retro-title-bar">
                <span className="font-bold text-xs">What I Can Help With</span>
              </div>
              <div className="p-4 px-[11px] py-px">
                <ul className="space-y-2">
                  {services.map((service, index) => <li key={index} className="flex items-start gap-3 text-foreground">
                      <span className="text-accent font-medium">→</span>
                      <span className="text-xs">{service}</span>
                    </li>)}
                </ul>
              </div>
            </div>

            {/* Quick Links Window */}
            
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;