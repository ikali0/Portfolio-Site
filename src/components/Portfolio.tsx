/**
 * Portfolio Section Component
 * 
 * Gallery-style carousel showcasing AI ethics case studies
 * with image overlays and smooth navigation.
 */
import { Gallery4, Gallery4Item } from "@/components/ui/gallery4";
import { ScrollFade } from "./ui/scroll-fade";
import { ParallaxShape, TriangleShape, GradientMesh } from "./ui/abstract-shapes";

// Import project images
import ethicsDashboard from "@/assets/portfolio-ethics-dashboard.jpg";
import governance from "@/assets/portfolio-governance.jpg";
import stakeholder from "@/assets/portfolio-stakeholder.jpg";
import biasDetection from "@/assets/portfolio-bias-detection.jpg";
import decisionFramework from "@/assets/portfolio-decision-framework.jpg";
import tutoring from "@/assets/portfolio-tutoring.jpg";

/**
 * Gallery items adapted from project case studies
 */
const galleryItems: Gallery4Item[] = [
  {
    id: "ethics-dashboard",
    title: "AI Ethics Dashboard",
    description: "Interactive platform for monitoring and auditing AI systems for fairness, transparency, and accountability metrics. Reduced bias incidents by 40%.",
    href: "#",
    image: ethicsDashboard,
  },
  {
    id: "governance-framework",
    title: "Governance Framework Tool",
    description: "Tool for organizations to create and implement AI governance policies with automated compliance checking. Cut audit prep time by 60%.",
    href: "#",
    image: governance,
  },
  {
    id: "stakeholder-mapping",
    title: "Stakeholder Mapping",
    description: "Visual tool for mapping stakeholder interests, power dynamics, and potential conflicts in tech deployment. Improved alignment by 35%.",
    href: "#",
    image: stakeholder,
  },
  {
    id: "bias-detection",
    title: "Bias Detection API",
    description: "RESTful API service for detecting and measuring various types of bias in datasets and model outputs. Supports 12+ fairness metrics.",
    href: "#",
    image: biasDetection,
  },
  {
    id: "decision-framework",
    title: "Ethical Decision Framework",
    description: "Mobile-first application helping teams make ethical decisions under time pressure with structured frameworks. 90% team adoption rate.",
    href: "#",
    image: decisionFramework,
  },
  {
    id: "tutoring-platform",
    title: "AI Tutoring Platform",
    description: "AI-powered tutoring platform providing personalized learning experiences and academic support services. Improved test scores by 25%.",
    href: "https://studii.lovable.app",
    image: tutoring,
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="relative bg-muted/30 overflow-hidden">
      {/* Background elements */}
      <ParallaxShape className="absolute top-20 right-0 w-32 h-32 opacity-20">
        <TriangleShape />
      </ParallaxShape>
      <ParallaxShape className="absolute bottom-32 left-10 w-24 h-24 opacity-15" speed={0.1}>
        <GradientMesh className="w-full h-full" />
      </ParallaxShape>

      <div className="relative z-10">
        {/* Section Label */}
        <div className="container mx-auto px-4">
          <ScrollFade>
            <div className="flex items-center gap-2 pt-section-sm md:pt-section">
              <span className="text-accent text-lg">✱</span>
              <span className="text-overline uppercase tracking-widest text-accent font-semibold">
                PORTFOLIO
              </span>
            </div>
          </ScrollFade>
        </div>

        {/* Gallery Carousel */}
        <Gallery4
          title="Case Studies"
          description="Real-world AI ethics projects showcasing measurable impact in fairness, governance, and responsible technology deployment."
          items={galleryItems}
        />
      </div>
    </section>
  );
};

export default Portfolio;