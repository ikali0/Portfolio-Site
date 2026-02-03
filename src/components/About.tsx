/**
 * About Section Component
 * 
 * Personal introduction with glassmorphism cards, scroll animations, and abstract shapes.
 * Includes integrated links to AI ethics writing on Medium and Substack.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faLightbulb, faHandshake, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faMedium } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { FlippingCard } from "./ui/flipping-card";
import { ScrollFade } from "./ui/scroll-fade";
import { BlobShape, SparkleShape, ParallaxShape } from "./ui/abstract-shapes";

interface HighlightData {
  icon: typeof faLaptopCode;
  title: string;
  description: string;
  backDescription: string;
}

const highlights: HighlightData[] = [
  {
    icon: faLaptopCode,
    title: "Technical Excellence",
    description: "Clean, maintainable code.",
    backDescription: "Production-ready code with testing and documentation.",
  },
  {
    icon: faLightbulb,
    title: "Creative Solutions",
    description: "Elegant problem solving.",
    backDescription: "Combining technical expertise with design thinking.",
  },
  {
    icon: faHandshake,
    title: "Team Player",
    description: "Collaborative impact.",
    backDescription: "Bridging technical and non-technical stakeholders.",
  },
];

function CardFront({ data }: { data: HighlightData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-card-sm text-center">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-element-sm">
        <FontAwesomeIcon icon={data.icon} className="w-4 h-4 text-primary" />
      </div>
      <h4 className="font-display text-body-sm font-medium text-foreground mb-1 leading-tight">
        {data.title}
      </h4>
      <p className="text-caption text-muted-foreground leading-snug">
        {data.description}
      </p>
    </div>
  );
}

function CardBack({ data }: { data: HighlightData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-card-sm text-center rounded-md bg-secondary/20">
      <p className="text-caption leading-snug text-foreground">
        {data.backDescription}
      </p>
    </div>
  );
}

const About = () => {
  return (
    <section
      id="about"
      className="relative py-section-sm md:py-section px-4 bg-muted/30 overflow-hidden"
    >
      {/* Abstract background shapes with parallax */}
      <ParallaxShape speed={0.15} className="w-64 h-64 -top-20 -right-20">
        <BlobShape className="w-full h-full opacity-60" />
      </ParallaxShape>
      <ParallaxShape speed={0.25} className="w-8 h-8 top-32 left-[10%]">
        <SparkleShape className="w-full h-full" />
      </ParallaxShape>
      <ParallaxShape speed={0.3} className="w-6 h-6 bottom-20 right-[15%]">
        <SparkleShape className="w-full h-full" />
      </ParallaxShape>

      <ScrollFade>
        <div className="container relative z-10 mx-auto max-w-2xl glass rounded-xl p-card md:p-container shadow-soft">
          {/* Header */}
          <div className="mb-container md:mb-container-lg">
            <p className="text-overline uppercase text-accent font-semibold mb-element-sm">
              About Me
            </p>
            <h2 className="font-display text-display-sm text-foreground mb-element-sm">
              Building with Purpose
            </h2>
          </div>

          {/* Description */}
          <div className="text-body-sm md:text-body text-muted-foreground space-y-card-sm mb-card leading-relaxed">
            <p>
              Developer and designer creating digital experiences. Background in{" "}
              <strong className="text-foreground font-semibold">
                computer science, public policy, and economics
              </strong>
              .
            </p>
            <p>
              Full-stack development focused on the intersection of{" "}
              <strong className="text-foreground font-semibold">
                technology and social impact
              </strong>
              . I write regularly about AI ethics, governance, and responsible deployment.
            </p>
          </div>

          {/* Writing Links - Editorial Style */}
          <div className="mb-container md:mb-container-lg">
            <p className="text-caption text-muted-foreground mb-3">
              Read my thoughts on AI ethics:
            </p>
            <div className="flex flex-wrap gap-2">
              <motion.a
                href="https://medium.com/@altruisticxai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-lg bg-card border border-border/50 text-body-sm font-medium text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors touch-manipulation group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faMedium} className="w-4 h-4 text-foreground" />
                <span>Medium</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
              <motion.a
                href="https://ingakali.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-lg bg-card border border-border/50 text-body-sm font-medium text-foreground hover:border-[#FF6719]/30 hover:bg-[#FF6719]/5 transition-colors touch-manipulation group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 text-[#FF6719]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                <span>Substack</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-muted-foreground group-hover:text-[#FF6719] transition-colors" />
              </motion.a>
            </div>
          </div>

          {/* Highlight Cards */}
          <div className="flex flex-wrap gap-container justify-center">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <FlippingCard
                  width={110}
                  height={120}
                  className="sm:w-[130px] sm:h-[140px] md:w-[150px] md:h-[160px]"
                  frontContent={<CardFront data={item} />}
                  backContent={<CardBack data={item} />}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollFade>
    </section>
  );
};

export default About;
