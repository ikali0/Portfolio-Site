import { ScrollFade, StaggerContainer, StaggerItem } from "@/components/ui/scroll-fade";
import { Code2, Database, Layout, Server, Cpu, GitBranch } from "lucide-react";

const skills = [
  {
    title: "Frontend Development",
    description: "React, Next.js, TypeScript, Tailwind CSS",
    icon: Layout,
  },
  {
    title: "Backend Development",
    description: "Node.js, Express, APIs, Authentication",
    icon: Server,
  },
  {
    title: "Databases",
    description: "PostgreSQL, MongoDB, Prisma",
    icon: Database,
  },
  {
    title: "DevOps & Tools",
    description: "Git, CI/CD, Docker",
    icon: GitBranch,
  },
  {
    title: "Performance",
    description: "Optimization, Lazy Loading, Code Splitting",
    icon: Cpu,
  },
  {
    title: "Clean Code",
    description: "Scalable Architecture & Best Practices",
    icon: Code2,
  },
];

export default function SkillsSection() {
  return (
    <section className="relative py-24 px-6 bg-black text-white overflow-hidden">
      
      {/* Section Title */}
      <ScrollFade className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          My Skills
        </h2>
        <p className="mt-4 text-gray-400">
          Technologies and tools I use to build high-performance applications.
        </p>
      </ScrollFade>

      {/* Skills Grid */}
      <div className="mt-16 max-w-6xl mx-auto">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <StaggerItem key={index}>
                <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition hover:bg-white/10 hover:border-indigo-500/50">
                  
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400 group-hover:scale-110 transition">
                      <Icon size={24} />
                    </div>

                    <h3 className="text-lg font-semibold">
                      {skill.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm text-gray-400">
                    {skill.description}
                  </p>

                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
