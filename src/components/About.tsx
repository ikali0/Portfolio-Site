/**
 * About Section Component
 * Token-compliant, accessible, refined layout.
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLaptopCode,
  faLightbulb,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons"
import { faMedium } from "@fortawesome/free-brands-svg-icons"
import { motion } from "framer-motion"

import { FlippingCard } from "./ui/flipping-card"
import { BlobShape, SparkleShape, ParallaxShape } from "./ui/abstract-shapes"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

/* ---------------- Types ---------------- */

interface HighlightData {
  icon: any
  title: string
  description: string
  backDescription: string
}

/* ---------------- Data ---------------- */

const highlights: HighlightData[] = [
  {
    icon: faLaptopCode,
    title: "Technical Excellence",
    description: "Clean, maintainable systems.",
    backDescription:
      "Production-ready architecture with testing and documentation.",
  },
  {
    icon: faLightbulb,
    title: "Creative Solutions",
    description: "Elegant problem framing.",
    backDescription:
      "Design thinking combined with engineering discipline.",
  },
  {
    icon: faHandshake,
    title: "Collaborative Impact",
    description: "Cross-functional alignment.",
    backDescription:
      "Bridging technical and non-technical stakeholders.",
  },
]

/* ---------------- Card Faces ---------------- */

function CardFront({ data }: { data: HighlightData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-card text-center">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
        <FontAwesomeIcon
          icon={data.icon}
          className="w-5 h-5 text-primary"
        />
      </div>

      <h4 className="font-display text-body font-semibold text-foreground mb-1">
        {data.title}
      </h4>

      <p className="text-caption text-muted-foreground">
        {data.description}
      </p>
    </div>
  )
}

function CardBack({ data }: { data: HighlightData }) {
  return (
    <div className="flex items-center justify-center h-full w-full p-card text-center bg-secondary/10">
      <p className="text-caption text-foreground leading-relaxed">
        {data.backDescription}
      </p>
    </div>
  )
}

/* ---------------- Section ---------------- */

export default function About() {
  return (
    <section
      id="about"
      className="relative py-section-sm md:py-section px-4 bg-muted/30 overflow-hidden"
    >
      {/* Abstract Background */}
      <ParallaxShape speed={0.15} className="w-64 h-64 -top-20 -right-20">
        <BlobShape className="w-full h-full opacity-50" />
      </ParallaxShape>

      <ParallaxShape speed={0.25} className="w-8 h-8 top-32 left-[10%]">
        <SparkleShape />
      </ParallaxShape>

      <ParallaxShape speed={0.3} className="w-6 h-6 bottom-20 right-[15%]">
        <SparkleShape />
      </ParallaxShape>

      {/* Main Glass Container */}
      <div className="container relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass border border-border/40 rounded-lg shadow-soft p-container"
        >
          {/* Header */}
          <div className="mb-container">
            <p className="text-overline uppercase text-accent font-semibold mb-2">
              About Me
            </p>

            <h2 className="font-display text-display-sm text-foreground">
              Building with Purpose
            </h2>
          </div>

          {/* Content */}
          <div className="text-body text-muted-foreground space-y-4 leading-relaxed mb-container">
            <p>
              I work at the intersection of{" "}
              <strong className="text-foreground">
                artificial intelligence, ethics, and human impact
              </strong>
              —focused not on hype, but on real-world consequences.
            </p>

            <p>
              Through independent long-form writing, I examine where
              AI systems create value, where they introduce harm,
              and how governance frameworks succeed or fail in practice.
            </p>

            <p>
              I believe technology should be{" "}
              <strong className="text-foreground">
                transparent, humane, and accountable
              </strong>
              —grounded in lived experience rather than abstraction.
            </p>
          </div>

          {/* Writing Links */}
          <TooltipProvider>
            <div className="flex flex-wrap gap-4 mb-container">
              <WritingLink
                href="https://medium.com/@altruisticxai"
                label="Medium"
                description="AI ethics essays"
                icon={<FontAwesomeIcon icon={faMedium} />}
              />

              <WritingLink
                href="https://ingakali.substack.com/"
                label="Substack"
                description="Ongoing analysis"
                icon={<FontAwesomeIcon icon={faMedium} />}
              />
            </div>
          </TooltipProvider>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 auto-rows-fr">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <FlippingCard
                  width={160}
                  height={180}
                  className="w-full h-full"
                  frontContent={<CardFront data={item} />}
                  backContent={<CardBack data={item} />}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- Writing Link ---------------- */

function WritingLink({
  href,
  label,
  description,
  icon,
}: {
  href: string
  label: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex flex-col px-4 py-3 rounded-lg border border-border/50 bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors min-h-[44px]"
        >
          <span className="flex items-center gap-2 text-foreground font-medium">
            {icon}
            {label}
          </span>

          <span className="text-caption text-muted-foreground">
            {description}
          </span>
        </motion.a>
      </TooltipTrigger>

      <TooltipContent>
        <p>Open {label}</p>
      </TooltipContent>
    </Tooltip>
  )
}
