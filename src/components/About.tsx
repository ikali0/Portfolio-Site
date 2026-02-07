/**
 * About Section Component
 * 
 * Modern split-panel editorial layout with animated text reveals,
 * professional statistics, and a call-to-action.
 */
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Mail, Coffee } from "lucide-react";
import { SiSubstack } from "react-icons/si";
import { TimelineContent, TimelineScale } from "./ui/timeline-animation";
import { VerticalCutReveal } from "./ui/vertical-cut-reveal";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
const About = () => {
  const heroRef = useRef(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5
      }
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0
    }
  };
  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5
      }
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0
    }
  };
  return <section id="about" className="relative bg-muted/30 overflow-hidden py-[8px] px-[10px]">
      <div className="container mx-auto px-4 max-w-6xl">
        
      </div>
    </section>;
};
export default About;