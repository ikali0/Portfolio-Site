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
  return;
};
export default Navbar;