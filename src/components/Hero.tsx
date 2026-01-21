import { ArrowDown, Linkedin, Mail } from "lucide-react";
import EntropyBackground from "./ui/entropy-background";
import { CartoonButton } from "./ui/cartoon-button";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 py-12 sm:py-20">
      {/* Background Layer */}
      <EntropyBackground className="z-0" />
      
      {/* Improved Readability Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/40 via-background/10 to-background/80 pointer-events-none" />
      
      <div className="container relative z-20 mx-auto max-w-4xl text-center md:text-left">
        
        {/* Badge: Applied AI */}
        <div className="animate-fade-up">
          <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase bg-fuchsia-300 text-fuchsia-950 rounded-full shadow-sm">
            Applied AI Engineer & Independent Consultant
          </span>
        </div>

        {/* Name */}
        <h1 className="animate-fade-up [animation-delay:200ms] font-display text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-foreground mb-6 leading-[0.9]">
          Inga K.
        </h1>

        {/* Subtext */}
        <p className="animate-fade-up [animation-delay:400ms] text-lg sm:text-xl md:text-2xl font-light text-slate-800 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed text-balance">
          I translate{" "}
          <span className="relative inline-block">
            <span className="relative z-10 font-medium text-foreground">policy into deployable controls</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-fuchsia-200/50 -z-10" />
          </span>{" "}
          and build AI systems that hold up under compliance, security, and real-world pressure.
        </p>

        {/* Social Actions */}
        <div className="animate-fade-up [animation-delay:600ms] flex items-center justify-center md:justify-start gap-4 mb-12">
          <a 
            href="https://www.linkedin.com/in/ik11/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-12 h-12 bg-fuchsia-700 hover:bg-fuchsia-600 text-white rounded-xl transition-all hover:scale-110 active:scale-95 shadow-lg"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="mailto:altruisticxai@gmail.com" 
            className="flex items-center justify-center w-12 h-12 bg-orange-500 hover:bg-orange-400 text-white rounded-xl transition-all hover:scale-110 active:scale-95 shadow-lg"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        {/* CTA Buttons: Grid on mobile, Flex on desktop */}
        <div className="animate-fade-up [animation-delay:800ms] grid grid-cols-2 gap-3 sm:flex sm:flex-wrap md:justify-start">
          <CartoonButton label="Experience" href="#experience" />
          <CartoonButton label="Portfolio" href="#portfolio" />
          <CartoonButton label="About" href="#about" />
          <CartoonButton label="Contact" href="#contact" />
        </div>

        {/* Scroll Indicator */}
        <div className="animate-fade-up [animation-delay:1000ms] absolute bottom-8 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mt-12">
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
            <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Scroll</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
