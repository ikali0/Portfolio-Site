import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { FlippingCard } from "@/components/ui/flipping-card";
import { motion, AnimatePresence } from "framer-motion";
import EntropyBackground from "@/components/EntropyBackground";
import { cn } from "@/lib/utils";

/** * Notebook Design Constants 
 */
const LINE_HEIGHT = 24; 
const NOTEBOOK_BG = `repeating-linear-gradient(transparent, transparent ${LINE_HEIGHT - 1}px, hsl(var(--border) / 0.3) ${LINE_HEIGHT - 1}px, hsl(var(--border) / 0.3) ${LINE_HEIGHT}px)`;
const CATEGORIES = ["All", "AI Ethics", "Governance", "Security", "Services"];

interface ProjectData {
  title: string;
  description: string;
  image: string;
  tags: string[];
  live?: string;
  category: string;
}

const projects: ProjectData[] = [
  {
    title: "Tutoring & Applied Services",
    description: "Personalized AI-driven academic support platform. Optimized for 1-on-1 pedagogical alignment and secure data handling.",
    image: "/portfolio-tutoring.jpg", 
    tags: ["React", "AI"],
    live: "https://studii.lovable.app",
    category: "Services"
  },
  {
    title: "Red-Team Llama Engine",
    description: "Adversarial testing suite for Llama-3. Automated jailbreak detection and prompt injection vulnerability mapping.",
    image: "/portfolio-bias-detection.jpg",
    tags: ["Llama-3", "Python"],
    category: "Security"
  },
  {
    title: "NIST RMF Automator",
    description: "Compliance tool mapping AI system outputs to NIST safety standards. Provides automated risk management auditing.",
    image: "/portfolio-governance.jpg",
    tags: ["Governance", "Next.js"],
    category: "Governance"
  },
  {
    title: "Agentic Risk Dashboard",
    description: "Visualizing decision-making chains in agentic workflows to identify bias and logic drift in real-time.",
    image: "/portfolio-ethics-dashboard.jpg",
    tags: ["React", "AI Ethics"],
    category: "AI Ethics"
  }
];

/** * Notebook Card Components 
 */
function ProjectCardFront({ project }: { project: ProjectData }) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden rounded-sm bg-[#fffdfa] border border-slate-300 shadow-sm">
      <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-slate-200/50 border-r border-slate-300 flex flex-col justify-around py-4 z-20">
        {[...Array(6)].map((_, i) => <div key={i} className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-400/40 shadow-inner mx-auto" />)}
      </div>
      <div className="ml-6 md:ml-8 flex flex-col h-full relative">
        <div className="aspect-[16/10] overflow-hidden border-b border-slate-200">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
        </div>
        <div className="flex-1 p-3" style={{ backgroundImage: NOTEBOOK_BG, backgroundSize: `100% ${LINE_HEIGHT}px` }}>
          <h3 className="text-[10px] md:text-xs font-bold text-slate-900 uppercase tracking-tight leading-[24px] truncate">{project.title}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {project.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[7px] md:text-[9px] font-mono text-fuchsia-600 bg-fuchsia-50 px-1 border border-fuchsia-100 uppercase">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCardBack({ project }: { project: ProjectData }) {
  return (
    <div className="flex flex-col h-full w-full rounded-sm bg-[#fffdfa] border border-slate-300 shadow-md relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-slate-200/50 border-r border-slate-300 flex flex-col justify-around py-4 z-20">
        {[...Array(6)].map((_, i) => <div key={i} className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-400/40 shadow-inner mx-auto" />)}
      </div>
      <div className="ml-6 md:ml-8 flex-1 p-3 border-l border-red-200" style={{ backgroundImage: NOTEBOOK_BG, backgroundSize: `100% ${LINE_HEIGHT}px` }}>
        <p className="text-[9px] md:text-[11px] text-slate-700 font-medium italic leading-[24px] line-clamp-6">{project.description}</p>
        <div className="absolute bottom-4 right-4 z-30">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-slate-900 text-white px-3 py-1.5 rounded-sm text-[8px] md:text-[10px] hover:bg-fuchsia-600 transition-colors shadow-lg active:scale-95">
              Open <ExternalLink className="w-2 h-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/** * Main Portfolio Section 
 */
const Portfolio = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter(p =>
    filter === "All" ? true : p.category === filter || p.tags.includes(filter)
  );

  return (
    <section id="portfolio" className="relative py-24 px-4 overflow-hidden min-h-screen">
      {/* Background layer - Ensure EntropyBackground handles the 'category' prop */}
      <div className="absolute inset-0 z-0">
        <EntropyBackground category={filter} />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-fuchsia-600">The Archive</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mt-2">Portfolio</h2>
          </motion.div>

          {/* Notebook Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-1.5 text-[10px] uppercase tracking-tighter font-bold border-2 transition-all duration-300",
                  filter === cat
                    ? "bg-fuchsia-600 border-fuchsia-600 text-white translate-y-[-4px] shadow-[0_4px_0_0_rgba(162,28,175,0.3)]"
                    : "bg-white border-slate-200 text-slate-400 hover:border-fuchsia-300 hover:text-fuchsia-500"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid with Animation */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex justify-center perspective-1000"
              >
                <FlippingCard
                  height={280}
                  className="w-full aspect-[3/4.5] max-w-[220px] md:max-w-none"
                  frontContent={<ProjectCardFront project={project} />}
                  backContent={<ProjectCardBack project={project} />}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
