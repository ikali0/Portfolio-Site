import { ExternalLink } from "lucide-react";

// Import generated images
import ethicsDashboard from "@/assets/portfolio-ethics-dashboard.jpg";
import governance from "@/assets/portfolio-governance.jpg";
import stakeholder from "@/assets/portfolio-stakeholder.jpg";
import biasDetection from "@/assets/portfolio-bias-detection.jpg";
import decisionFramework from "@/assets/portfolio-decision-framework.jpg";
import tutoring from "@/assets/portfolio-tutoring.jpg";

interface ProjectData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
}

const projects: ProjectData[] = [
  {
    title: "AI Ethics Dashboard",
    description:
      "Interactive platform for monitoring and auditing AI systems for fairness, transparency, and accountability metrics.",
    image: ethicsDashboard,
    tags: ["React", "Python"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Governance Framework",
    description:
      "Tool for organizations to create and implement AI governance policies with automated compliance checking.",
    image: governance,
    tags: ["Next.js", "TypeScript"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Stakeholder Mapping",
    description:
      "Visual tool for mapping stakeholder interests, power dynamics, and potential conflicts in tech deployment.",
    image: stakeholder,
    tags: ["React", "Force Graph"],
    github: "https://github.com",
  },
  {
    title: "Bias Detection API",
    description:
      "RESTful API service for detecting and measuring various types of bias in datasets and model outputs.",
    image: biasDetection,
    tags: ["Python", "FastAPI"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Decision Framework",
    description:
      "Mobile-first application helping teams make ethical decisions under time pressure with structured frameworks.",
    image: decisionFramework,
    tags: ["React Native", "Firebase"],
    github: "https://github.com",
  },
  {
    title: "Tutoring & Applied Services",
    description:
      "AI-powered tutoring platform providing personalized learning experiences and academic support services.",
    image: tutoring,
    tags: ["React", "AI"],
    github: "https://github.com",
    live: "https://studii.lovable.app",
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className="portfolio-card-3d h-full"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="portfolio-card-inner flex flex-col h-full overflow-hidden rounded-xl bg-card border-2 border-border">
        {/* Image Container with Shine Effect */}
        <div className="card-image-shine relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent opacity-60"
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col flex-1 p-4 sm:p-5">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight mb-2 font-display line-clamp-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div
            className="flex flex-wrap gap-1.5 sm:gap-2 mb-4"
            role="list"
            aria-label="Technologies used"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                role="listitem"
                className="portfolio-tag text-xs text-secondary-foreground bg-secondary/15 px-2.5 py-1 rounded-full border border-secondary/30 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-button inline-flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 px-4 text-sm font-medium text-primary-foreground bg-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card"
              aria-label={`View ${project.title} project`}
            >
              <span>View Project</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="py-16 md:py-24 px-4 bg-muted/30"
      aria-labelledby="portfolio-heading"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10 md:mb-14 text-center">
          <p className="text-xs md:text-sm uppercase tracking-widest mb-2 text-accent font-semibold">
            Personal Projects
          </p>
          <h2
            id="portfolio-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-foreground mb-3"
          >
            Featured Work
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
            A selection of projects I've designed and built.
          </p>
        </header>

        {/* Responsive Grid - Mobile first with proper gaps */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Portfolio projects"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
