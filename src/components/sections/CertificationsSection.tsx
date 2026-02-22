import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, GraduationCap, Briefcase } from 'lucide-react';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  category: 'professional' | 'academic' | 'workshop';
  /** Optional: override logo. If not set, derived from issuer via ISSUER_DOMAINS. */
  issuerLogoUrl?: string;
}

/** Allow only https or relative URLs for credential links (prevents javascript:/data: etc if JSON is ever untrusted). */
function isSafeCredentialUrl(url: string): boolean {
  const t = url.trim().toLowerCase();
  return t.startsWith('https://') || t.startsWith('/');
}

/** Map issuer name → domain for fetching company logo (Google favicon service). */
const ISSUER_DOMAINS: Record<string, string> = {
  Lovable: 'lovable.dev',
  Forage: 'theforage.com',
  Kaggle: 'kaggle.com',
  Oracle: 'oracle.com',
  'École Intuit Lab': 'ecole-intuit-lab.com',
  'Savannah College of Art and Design': 'scad.edu',
  'Hong Kong Baptist University': 'hkbu.edu.hk',
};

function getIssuerLogoUrl(cert: Certification): string | null {
  if (cert.issuerLogoUrl) return cert.issuerLogoUrl;
  const domain = ISSUER_DOMAINS[cert.issuer];
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

/** Fallback list when /data/certifications.json is missing or fetch fails. */
const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    id: 'vibe-coding-bronze',
    name: 'Vibe Coding L1: Bronze',
    issuer: 'Lovable',
    issuedDate: 'Feb 2026',
    skills: ['Vibe Coding'],
    category: 'professional',
  },
  {
    id: 'tata-cybersecurity',
    name: 'Tata - Cybersecurity Analyst Job Simulation',
    issuer: 'Forage',
    issuedDate: 'Dec 2025',
    credentialId: 'tTPe6Ra82M2GizJCm',
    credentialUrl: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_68cd31279df00756101693c9_1764637820741_completion_certificate.pdf',
    skills: ['Communication', 'Critical Thinking', 'Cybersecurity'],
    category: 'professional',
  },
  {
    id: 'kaggle-advanced-sql',
    name: 'Advanced SQL',
    issuer: 'Kaggle',
    issuedDate: 'Dec 2025',
    skills: ['SQL', 'Functional Programming', 'Data Analysis', 'Database Design', 'Query Optimization', 'ETL', 'Reporting'],
    category: 'professional',
  },
  {
    id: 'kaggle-intro-sql',
    name: 'Intro to SQL',
    issuer: 'Kaggle',
    issuedDate: 'Nov 2025',
    skills: ['Data Analysis', 'SQL', 'Databases'],
    category: 'professional',
  },
  {
    id: 'kaggle-python',
    name: 'Python',
    issuer: 'Kaggle',
    issuedDate: 'Nov 2025',
    skills: ['Python', 'Pandas', 'Data Science', 'Data Cleaning', 'Visualization', 'Machine Learning', 'NumPy', 'Jupyter'],
    category: 'professional',
  },
  {
    id: 'kaggle-intro-programming',
    name: 'Intro to Programming',
    issuer: 'Kaggle',
    issuedDate: 'Nov 2025',
    skills: ['Programming', 'Python'],
    category: 'professional',
  },
  {
    id: 'oci-architect-associate',
    name: 'Oracle Cloud Infrastructure 2025 Certified Architect Associate',
    issuer: 'Oracle',
    issuedDate: 'Oct 2025',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=091250A6933DA4BA39E6A6CD8EFAB0E6E3450C8B322DA8A0915290AB9C612CC3',
    skills: ['OCI', 'Cloud Management', 'Architecture', 'Networking', 'Security', 'Compute', 'Storage', 'Identity'],
    category: 'professional',
  },
  {
    id: 'oci-genai-professional',
    name: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    issuer: 'Oracle',
    issuedDate: 'Oct 2025',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=CF1E0E91D1EC57EF1A3EDEE4B969752791A59097D4E4814206721E0D5CDDF27D',
    skills: ['Large Language Models (LLM)', 'OCI', 'Generative AI', 'RAG', 'Prompt Engineering', 'Model Deployment', 'AI Services', 'Vector DB', 'Inference', 'Ethics'],
    category: 'professional',
  },
  {
    id: 'oracle-data-foundations',
    name: 'Oracle Data Platform 2025 Certified Foundations Associate',
    issuer: 'Oracle',
    issuedDate: 'Oct 2025',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=C056548DDE1DB8E8C603592DB9FB8899B1BBBF4202C655AE6C8E597CB64BEC91',
    skills: ['Data Lakes', 'OCI', 'Data Integration', 'Data Catalog', 'Analytics', 'Data Governance', 'ETL', 'Warehousing'],
    category: 'professional',
  },
  {
    id: 'oci-foundations-associate',
    name: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
    issuer: 'Oracle',
    issuedDate: 'Oct 2025',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=BC0F2529068566147E6DEAAA70211B6956AA1D4AA55A2FE5530E890FA1726139',
    skills: ['OCI', 'Cloud Management', 'Compute', 'Storage', 'Networking', 'Security', 'Identity', 'Monitoring', 'Cost Management', 'Governance', 'Compliance', 'Automation'],
    category: 'professional',
  },
  {
    id: 'oci-ai-foundations',
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    issuedDate: 'Oct 2025',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=41E5B83EAB5D0B84F8EA68D90FBB8BC1C4972D59AE455F979A46A5B8AC6A5637',
    skills: ['OCI', 'Oracle Applications', 'AI/ML', 'Data Science', 'Model Training', 'Inference', 'AI Services', 'Integration', 'Best Practices'],
    category: 'professional',
  },
  {
    id: 'unreal-intuit',
    name: 'Introduction to Unreal Engines',
    issuer: 'École Intuit Lab',
    issuedDate: 'Feb 2024',
    skills: ['Game Design', 'Unreal Editor', 'Blueprints', '3D', 'Level Design', 'Lighting', 'Materials', 'Animation'],
    category: 'academic',
  },
  {
    id: 'ux-scad',
    name: 'UX Design: Research to Prototype',
    issuer: 'Savannah College of Art and Design',
    issuedDate: 'Jun 2024',
    skills: ['Usability Testing', 'Empathy Mapping', 'User Research', 'Wireframing', 'Prototyping', 'Figma', 'Design Systems', 'Accessibility', 'Information Architecture', 'Personas', 'Journey Maps', 'Iteration', 'Stakeholder Presentation', 'Design Thinking'],
    category: 'academic',
  },
  {
    id: 'iot-hkbu',
    name: 'Getting Started with IoT: Build Your Own Mobile App with Sensor Technology Workshop',
    issuer: 'Hong Kong Baptist University',
    issuedDate: 'Jul 2024',
    skills: ['Microcontrollers', 'Sensors', 'IoT', 'Mobile Development', 'Bluetooth', 'Arduino/ESP', 'Data Streaming', 'APIs', 'Prototyping', 'Hardware', 'Firmware'],
    category: 'workshop',
  },
];

const categoryConfig = {
  professional: { label: 'Professional', icon: Briefcase, color: 'text-primary' },
  academic: { label: 'Academic & Courses', icon: GraduationCap, color: 'text-secondary' },
  workshop: { label: 'Workshops & Summer', icon: Award, color: 'text-accent' },
} as const;

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<Certification['category'] | 'all'>('all');
  const [certifications, setCertifications] = useState<Certification[]>(DEFAULT_CERTIFICATIONS);
  const [failedLogoIds, setFailedLogoIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/certifications.json`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Not found'))))
      .then((data: Certification[]) => {
        if (Array.isArray(data) && data.length > 0) setCertifications(data);
      })
      .catch(() => { /* use DEFAULT_CERTIFICATIONS */ });
  }, []);

  const filteredCerts =
    filter === 'all'
      ? certifications
      : certifications.filter((c) => c.category === filter);

  return (
    <section id="certifications" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Certifications & Achievements</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            Professional certificates, summer courses, and verifiable credentials
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                filter === 'all'
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-muted/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              <Award className="w-4 h-4" />
              <span className="text-sm">All</span>
            </button>
            {(Object.entries(categoryConfig) as [Certification['category'], typeof categoryConfig.professional][]).map(
              ([key, { label, icon: Icon, color }]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                    filter === key
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-muted/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-sm">{label}</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Certificate cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCerts.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                  {getIssuerLogoUrl(cert) && !failedLogoIds.has(cert.id) ? (
                    <img
                      src={getIssuerLogoUrl(cert)!}
                      alt=""
                      className="h-10 w-10 object-cover"
                      onError={() => setFailedLogoIds((prev) => new Set(prev).add(cert.id))}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <Award className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {cert.issuer} · {cert.issuedDate}
                    </p>
                    <h3 className="mt-0.5 font-mono font-medium text-foreground leading-tight">
                      {cert.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-md bg-muted/80 px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 5 && (
                      <span className="text-xs text-muted-foreground">+{cert.skills.length - 5}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2">
                {cert.credentialId && (
                  <p className="text-xs text-muted-foreground truncate" title={cert.credentialId}>
                    ID: {cert.credentialId}
                  </p>
                )}
                <div className="ml-auto flex items-center gap-2">
                  {cert.credentialUrl && isSafeCredentialUrl(cert.credentialUrl) && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Show credential
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Verifiable credentials and recognition from courses, job simulations, and workshops.
        </motion.p>
      </div>
    </section>
  );
};

export default CertificationsSection;
