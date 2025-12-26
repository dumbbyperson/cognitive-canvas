import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus, ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  status: 'complete' | 'in_progress' | 'paused' | 'learned';
  category: string;
  links?: {
    live?: string;
    code?: string;
  };
  details?: {
    whatBuilt: string;
    whyBuilt: string;
    constraints: string;
    learned: string;
    broken: string;
  };
}

const portfolioProject: Project = {
  id: 'portfolio',
  title: 'This Portfolio Website',
  description: 'A quantum punk thinking interface. Yes, this website.',
  techStack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'D3.js'],
  status: 'in_progress',
  category: 'Web Development',
  links: {
    live: '#',
    code: '#',
  },
  details: {
    whatBuilt: 'A portfolio that functions as both a thinking interface and creative expression, featuring interactive demos, a systems map, and punk-tech aesthetics.',
    whyBuilt: 'To demonstrate not just what I can build, but how I think and approach problems. Traditional portfolios are boring.',
    constraints: 'Had to balance visual complexity with performance. Every animation must run at 60fps. Mobile-first considerations.',
    learned: 'D3.js force-directed graphs, advanced CSS animations, performance optimization for particle systems.',
    broken: "The first version of the particle system tanked mobile performance. Had to implement adaptive quality based on device capabilities.",
  },
};

const categories = [
  'All',
  'Quantum Experiments',
  'Astrophysics',
  'AI/ML',
  'Cybersecurity',
  'Cloud',
  'Data Science',
  'Web Development',
];

const statusColors = {
  complete: 'bg-success/20 text-success border-success/30',
  in_progress: 'bg-primary/20 text-primary border-primary/30',
  paused: 'bg-warning/20 text-warning border-warning/30',
  learned: 'bg-tertiary/20 text-tertiary border-tertiary/30',
};

const statusLabels = {
  complete: 'Complete',
  in_progress: 'In Progress',
  paused: 'Paused',
  learned: 'Learned & Moved On',
};

const ProjectCard = ({ project, isExpanded, onToggle }: { 
  project: Project; 
  isExpanded: boolean; 
  onToggle: () => void;
}) => (
  <motion.div
    layout
    className="card-punk rounded-xl overflow-hidden"
  >
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-mono font-bold text-lg mb-1">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded border ${statusColors[project.status]}`}>
          {statusLabels[project.status]}
        </span>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
            {tech}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {project.links?.live && (
          <a
            href={project.links.live}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary-glow transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Live
          </a>
        )}
        {project.links?.code && (
          <a
            href={project.links.code}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
            See Code
          </a>
        )}
        <button
          onClick={onToggle}
          className="ml-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? 'Less' : 'More'}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>

    {/* Expanded details */}
    {isExpanded && project.details && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-t border-border p-6 space-y-4 bg-card-elevated/50"
      >
        <div>
          <h4 className="text-sm font-mono text-primary mb-1">What I Built</h4>
          <p className="text-sm text-muted-foreground">{project.details.whatBuilt}</p>
        </div>
        <div>
          <h4 className="text-sm font-mono text-secondary mb-1">Why I Built It</h4>
          <p className="text-sm text-muted-foreground">{project.details.whyBuilt}</p>
        </div>
        <div>
          <h4 className="text-sm font-mono text-tertiary mb-1">Constraints</h4>
          <p className="text-sm text-muted-foreground">{project.details.constraints}</p>
        </div>
        <div>
          <h4 className="text-sm font-mono text-success mb-1">What I Learned</h4>
          <p className="text-sm text-muted-foreground">{project.details.learned}</p>
        </div>
        <div>
          <h4 className="text-sm font-mono text-warning mb-1">What Broke</h4>
          <p className="text-sm text-muted-foreground">{project.details.broken}</p>
        </div>
      </motion.div>
    )}
  </motion.div>
);

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-32 bg-gradient-radial" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-header">Projects</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            What I've built, why I built it, and what I learned
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Portfolio project - always first */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ProjectCard
              project={portfolioProject}
              isExpanded={expandedProject === portfolioProject.id}
              onToggle={() => setExpandedProject(
                expandedProject === portfolioProject.id ? null : portfolioProject.id
              )}
            />
          </motion.div>

          {/* Empty project placeholders */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="empty-state flex flex-col items-center justify-center min-h-[200px] group hover:border-primary/50 transition-colors cursor-pointer"
            >
              <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
              <p className="empty-state-text">[Add Project]</p>
              <p className="text-xs text-muted-foreground mt-2">
                Projects will appear here as I build them
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
