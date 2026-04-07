import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const projectLogo = `${import.meta.env.BASE_URL}favicon.svg`;
const projectPreviewBase = `${import.meta.env.BASE_URL}project-previews/`;

const services = [
  {
    id: "cse-projects",
    title: "CSE Projects",
    headline: "Final-year project builds with the original Project Studio flow.",
    copy:
      "Browse sample CSE projects, compare packages, and open the dedicated request page for diploma and engineering builds.",
    href: "cse-projects/",
    cta: "Open CSE Projects",
    badge: "Core builds",
    preview: `${projectPreviewBase}smart-attendance.jpg`,
    alt: "Preview of a CSE project dashboard with clean project sections",
    accent: "#0f172a",
    chips: ["React", "Node", "MySQL"],
  },
  {
    id: "smallworks",
    title: "Small Works",
    headline: "Quick creative support for small design jobs.",
    copy:
      "PPTs, posters, flyers, social posts, banners, brochure layouts, and formatting cleanup, all handled in a fast and neat flow.",
    href: "smallworks/",
    cta: "Open Small Works",
    badge: "Fast turnaround",
    preview: `${projectPreviewBase}campus-events.jpg`,
    alt: "Preview of a creative project screen for quick design work",
    accent: "#2563eb",
    chips: ["PPTs", "Posters", "Cleanup"],
  },
  {
    id: "professional-projects",
    title: "Professional Projects",
    headline: "Professional website for businesses.",
    copy:
      "Responsive project sites with more polish, better structure, and a presentation-ready look for final-year and client-style builds.",
    href: "professional-projects/",
    cta: "Open Professional Projects",
    badge: "Premium finish",
    preview: `${projectPreviewBase}placement-hub.jpg`,
    alt: "Preview of a polished professional website dashboard",
    accent: "#0f766e",
    chips: ["Responsive", "Business-ready", "Showcase"],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const cubeFaces = [
  { key: "front", className: "home-cube__face--front" },
  { key: "back", className: "home-cube__face--back" },
  { key: "right", className: "home-cube__face--right" },
  { key: "left", className: "home-cube__face--left" },
  { key: "top", className: "home-cube__face--top" },
  { key: "bottom", className: "home-cube__face--bottom" },
];

function ServiceCard({ service, reducedMotion }) {
  const cardHover = reducedMotion
    ? undefined
    : { y: -10, rotateX: 2, rotateY: -3 };
  const imageHover = reducedMotion ? undefined : { scale: 1.04 };
  const tapMotion = reducedMotion ? undefined : { scale: 0.99 };

  return (
    <motion.article
      className="project-card service-card"
      variants={itemVariants}
      whileHover={cardHover}
      whileTap={tapMotion}
    >
      <div
        className="project-card__preview service-card__preview"
        style={{
          background: `linear-gradient(180deg, ${service.accent}22, rgba(255, 255, 255, 0))`,
        }}
      >
        <motion.img
          className="project-card__image service-card__image"
          src={service.preview}
          alt={service.alt}
          loading="lazy"
          decoding="async"
          whileHover={imageHover}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="project-card__body service-card__body">
        <span className="note-chip service-card__badge">{service.badge}</span>
        <p className="service-card__eyebrow">{service.title}</p>
        <h3>{service.headline}</h3>
        <p>{service.copy}</p>
        <div className="tag-row">
          {service.chips.map((chip) => (
            <span className="tag" key={chip}>
              {chip}
            </span>
          ))}
        </div>
        <motion.a
          className="button button-primary service-card__button"
          href={service.href}
          whileHover={reducedMotion ? undefined : { y: -1 }}
          whileTap={tapMotion}
        >
          {service.cta}
        </motion.a>
      </div>
    </motion.article>
  );
}

function HomeStage({ reducedMotion }) {
  const cubeAnimation = reducedMotion
    ? { rotateX: 16, rotateY: -18, rotateZ: 4 }
    : {
        rotateX: [16, -14, 16],
        rotateY: [0, 360],
        rotateZ: [4, -4, 4],
      };

  const cubeTransition = reducedMotion
    ? { duration: 0 }
    : {
        duration: 18,
        repeat: Infinity,
        ease: "linear",
      };

  const ringTransition = reducedMotion
    ? { duration: 0 }
    : {
        duration: 28,
        repeat: Infinity,
        ease: "linear",
      };

  const orbAnimation = reducedMotion
    ? { scale: 1 }
    : { scale: [1, 1.08, 1], y: [0, -8, 0] };

  const orbTransition = reducedMotion
    ? { duration: 0 }
    : {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      };

  return (
    <motion.div
      className="home-stage"
      variants={sectionVariants}
      initial="hidden"
      animate="show"
    >
      <div className="home-stage__scene" aria-hidden="true">
        <motion.div
          className="home-stage__orb"
          animate={orbAnimation}
          transition={orbTransition}
        />
        <motion.div
          className="home-stage__ring home-stage__ring--outer"
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={ringTransition}
        />
        <motion.div
          className="home-stage__ring home-stage__ring--inner"
          animate={reducedMotion ? undefined : { rotate: -360 }}
          transition={ringTransition}
        />
        <motion.div
          className="home-cube"
          animate={cubeAnimation}
          transition={cubeTransition}
        >
          {cubeFaces.map((face) => (
            <span
              key={face.key}
              className={`home-cube__face ${face.className}`}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function App() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = "Project Studio | Choose a Service";
  }, []);

  return (
    <div className="home-page">
      <div className="home-page__glow home-page__glow--one" />
      <div className="home-page__glow home-page__glow--two" />
      <div className="home-page__glow home-page__glow--three" />

      <main className="home-main">
        <motion.section
          className="panel home-hero"
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div className="home-copy" variants={listVariants}>
            <motion.div className="home-brand" variants={itemVariants}>
              <img
                className="brand-mark"
                src={projectLogo}
                alt=""
                aria-hidden="true"
              />
              <span className="home-brand__copy">
                <span>Project Studio</span>
                <strong>Choose a service</strong>
              </span>
            </motion.div>

            <motion.p className="eyebrow eyebrow--hero" variants={itemVariants}>
              Service menu
            </motion.p>

            <motion.h1 variants={itemVariants}>
              Pick the service page that matches your next move.
            </motion.h1>

            <motion.p className="home-summary" variants={itemVariants}>
              CSE Projects is for final-year builds, Small Works is for quick
              creative tasks, and Professional Projects is for polished
              website builds. Tap the card you want and go straight to that
              page.
            </motion.p>

            <motion.div className="home-pills" variants={itemVariants}>
              <span className="note-chip">Responsive</span>
              <span className="note-chip">Interactive previews</span>
              <span className="note-chip">3D motion</span>
            </motion.div>
          </motion.div>

          <HomeStage reducedMotion={reducedMotion} />
        </motion.section>

        <motion.section
          className="home-services"
          aria-label="Available services"
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.section>
      </main>
    </div>
  );
}

export default App;
