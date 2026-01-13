import { Mail, Linkedin, Download } from "lucide-react";

const Contact = () => {
  const services = [
    "Full-stack web development",
    "AI/ML integration & consulting",
    "Technical architecture & code review",
    "UI/UX design implementation",
  ];

  return (
    <section id="contact" className="py-24 px-4 bg-card">
      <div className="container mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-widest text-accent font-medium mb-3">
          Get In Touch
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-6">
          Let's Build Something Great
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          I'm currently open to freelance projects and full-time opportunities.
          Let's talk about how I can help bring your ideas to life.
        </p>

        <div className="bg-background border border-border rounded-lg p-8 mb-10 text-left">
          <p className="text-sm uppercase tracking-widest text-accent font-medium mb-4">
            What I Can Help With
          </p>
          <ul className="grid md:grid-cols-2 gap-3">
            {services.map((service, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-foreground"
              >
                <span className="text-accent font-medium">→</span>
                <span className="text-sm">{service}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:altruisticxai@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-md font-medium text-sm hover:bg-foreground/90 transition-colors"
          >
            <Mail className="w-4 h-4" />
            altruisticxai@gmail.com
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-md font-medium text-sm hover:bg-muted transition-colors"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <a
            href="https://www.linkedin.com/in/ik11/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
