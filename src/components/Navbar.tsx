import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [{
    label: "About",
    href: "#about"
  }, {
    label: "Skills",
    href: "#skills"
  }, {
    label: "Portfolio",
    href: "#portfolio"
  }, {
    label: "Experience",
    href: "#experience"
  }, {
    label: "Contact",
    href: "#contact"
  }];
  const handleLinkClick = () => {
    setOpen(false);
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-sm shadow-soft py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto flex items-start justify-between">
        

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => <a key={link.href} href={link.href} className="nav-link text-sm">
              {link.label}
            </a>)}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="p-2 text-foreground hover:text-accent transition-colors" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background border-border">
            <div className="flex flex-col gap-8 mt-8">
              {navLinks.map(link => <a key={link.href} href={link.href} onClick={handleLinkClick} className="font-display text-xl text-foreground hover:text-accent transition-colors">
                  {link.label}
                </a>)}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>;
};
export default Navbar;