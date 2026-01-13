import { ArrowDown, Linkedin, Mail } from "lucide-react";
import EntropyBackground from "./ui/entropy-background";
import { CartoonButton } from "./ui/cartoon-button";
const Hero = () => {
  return <section className="relative min-h-[85svh] flex items-center justify-center pt-16 pb-12 px-4 overflow-hidden">
      {/* Entropy Particle Background */}
      <EntropyBackground className="z-0" />
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 z-10 pointer-events-none" />
      
      <div className="container mx-auto max-w-3xl relative z-20">
        <div className="animate-fade-up opacity-0">
          <p className="text-xs md:text-sm uppercase tracking-widest mb-3 text-slate-800 bg-fuchsia-300">
            AI Policy Engineer · Security Researcher
          </p>
        </div>

        <h1 className="animate-fade-up opacity-0 delay-100 font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4 text-balance">
          Inga Kaltak
        </h1>

        <p className="animate-fade-up opacity-0 delay-200 text-lg md:text-xl font-light mb-6 max-w-xl leading-relaxed text-slate-950">
          I translate{" "}
          <span className="highlight-text text-foreground font-medium">
            policy into deployable controls
          </span>{" "}
          and build AI systems that hold up under compliance, security, and real-world pressure.
        </p>

        <div className="animate-fade-up opacity-0 delay-300 flex items-center gap-3 mb-6">
          <a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="p-2 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-accent transition-colors bg-fuchsia-700">
            <Linkedin className="w-4 h-4 text-slate-50" />
          </a>
          <a href="mailto:altruisticxai@gmail.com" className="p-2 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-accent transition-colors bg-orange-400">
            <Mail className="w-4 h-4 text-slate-50" />
          </a>
        </div>

        <div className="animate-fade-up opacity-0 delay-400 flex flex-wrap gap-2">
          <CartoonButton label="Experience" href="#experience" />
          <CartoonButton label="Portfolio" href="#portfolio" />
          <CartoonButton label="About" href="#about" />
          <CartoonButton label="Contact" href="#contact" />
        </div>

        <div className="animate-fade-up opacity-0 delay-500 mt-12 flex justify-center">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>;
};
export default Hero;