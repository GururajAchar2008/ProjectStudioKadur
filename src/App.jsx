import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import "./hm-styles.css";

const projectLogo = `${import.meta.env.BASE_URL}favicon.svg`;
const projectPreviewBase = `${import.meta.env.BASE_URL}project-previews/`;

const services = [
  {
    id: "cse-projects",
    title: "CSE Projects",
    headline: "Final-year project builds with the original Project Studio flow.",
    copy: "Browse sample CSE projects, compare packages, and open the dedicated request page for diploma and engineering builds.",
    href: "cse-projects/",
    cta: "Open CSE Projects",
    badge: "Core builds",
    preview: `${projectPreviewBase}smart-attendance.jpg`,
    alt: "Preview of a CSE project dashboard",
    accent: "rgba(59, 130, 246, 0.5)", // Blue
    accentSolid: "#3b82f6",
    chips: ["React", "Node", "MySQL"],
  },
  {
    id: "smallworks",
    title: "Small Works",
    headline: "Quick creative support for small design jobs.",
    copy: "PPTs, posters, flyers, social posts, banners, brochure layouts, and formatting cleanup, all handled in a fast and neat flow.",
    href: "smallworks/",
    cta: "Open Small Works",
    badge: "Fast turnaround",
    preview: `${projectPreviewBase}campus-events.jpg`,
    alt: "Preview of a creative project screen",
    accent: "rgba(236, 72, 153, 0.5)", // Pink
    accentSolid: "#ec4899",
    chips: ["PPTs", "Posters", "Cleanup"],
  },
  {
    id: "professional-projects",
    title: "Professional Projects",
    headline: "Professional website for businesses.",
    copy: "Responsive project sites with more polish, better structure, and a presentation-ready look for final-year and client-style builds.",
    href: "professional-projects/",
    cta: "Open Professional Projects",
    badge: "Premium finish",
    preview: `${projectPreviewBase}placement-hub.jpg`,
    alt: "Preview of a polished professional website",
    accent: "rgba(139, 92, 246, 0.5)", // Violet
    accentSolid: "#8b5cf6",
    chips: ["Responsive", "Business-ready", "Showcase"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function ServiceCard({ service, reducedMotion }) {
  const cardHover = reducedMotion
    ? undefined
    : { y: -8, scale: 1.02 };
  const imageHover = reducedMotion ? undefined : { scale: 1.05 };

  return (
    <motion.article
      className="hm-card group"
      variants={itemVariants}
      whileHover={cardHover}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="hm-card-glow" style={{ background: service.accent }} />
      <div className="hm-card-content">
        <div className="hm-card-image-wrap">
          <motion.img
            src={service.preview}
            alt={service.alt}
            className="hm-card-img"
            loading="lazy"
            whileHover={imageHover}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="hm-card-image-overlay" />
          <span className="hm-card-badge" style={{ color: service.accentSolid, borderColor: service.accent }}>
            {service.badge}
          </span>
        </div>
        
        <div className="hm-card-body">
          <p className="hm-eyebrow" style={{ color: service.accentSolid }}>{service.title}</p>
          <h3 className="hm-card-title">{service.headline}</h3>
          <p className="hm-card-copy">{service.copy}</p>
          
          <div className="hm-chip-row">
            {service.chips.map((chip) => (
              <span key={chip} className="hm-chip">{chip}</span>
            ))}
          </div>

          <a href={service.href} className="hm-btn mt-auto" style={{ '--btn-color': service.accentSolid }}>
            <span>{service.cta}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function Hyperstage({ reducedMotion }) {
  if (reducedMotion) return <div className="hm-stage-static" />;
  
  return (
    <div className="hm-stage">
      <motion.div
        className="hm-orb hm-orb-1"
        animate={{
          x: [0, 50, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hm-orb hm-orb-2"
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 50, -10, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="hm-orb hm-orb-3"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <div className="hm-stage-glass" />
    </div>
  );
}

function App() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = "Project Studio | Premium Services";
  }, []);

  return (
    <div className="hm-app">
      <header className="hm-header">
        <div className="hm-container flex-between">
          <div className="hm-brand">
            <img src={projectLogo} alt="Logo" className="hm-logo" />
            <span className="hm-brand-text">Project Studio</span>
          </div>
        </div>
      </header>

      <main className="hm-main">
        <section className="hm-hero">
          <Hyperstage reducedMotion={reducedMotion} />
          
          <div className="hm-container">
            <motion.div 
              className="hm-hero-content"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={itemVariants} className="hm-hero-pill">
                <span className="hm-hero-indicator" />
                Service Menu Active
              </motion.div>

              <motion.h1 variants={itemVariants} className="hm-title">
                Elevate your next <br/>
                <span className="hm-text-gradient">digital experience</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="hm-subtitle">
                Select a service tailored to your absolute needs. From robust final-year 
                engineering builds to breathtaking professional interfaces.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="hm-services">
          <div className="hm-container">
            <motion.div 
              className="hm-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  reducedMotion={reducedMotion}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="hm-footer">
        <div className="hm-container">
          <p>© {new Date().getFullYear()} Project Studio. Crafted for excellence.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
