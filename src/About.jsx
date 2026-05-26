import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavContent } from "./NavContent";
import "./About.css";

const aboutPillars = [
  {
    title: "Three service lanes",
    copy: "CSE projects, small creative work, and professional business websites stay separated so each visitor lands in the right flow.",
  },
  {
    title: "Built for clarity",
    copy: "The site keeps the menu, pricing, request flow, and confirmation page easy to read on every screen size.",
  },
  {
    title: "Polished but practical",
    copy: "Glass panels, gradients, and motion give the site energy without getting in the way of the content.",
  },
];

const workingSteps = [
  "Pick the service that fits your need.",
  "Review the package or request details on that page.",
  "Submit the form and land on the confirmation screen.",
];

const aboutStats = [
  { value: "3", label: "service tracks" },
  { value: "1", label: "shared request flow" },
  { value: "100%", label: "responsive pages" },
];

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: index * 0.08, ease: "easeOut" },
  }),
};

const About = () => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = "About | Project Studio";
  }, []);

  const projectLogo = `${import.meta.env.BASE_URL}favicon.svg`;

  return (
    <div className="page-shell about-page">
      <div className="ambient about-ambient about-ambient-a" />
      <div className="ambient about-ambient about-ambient-b" />

      <header className="hm-header page-header">
        <div className="hm-container flex-between">
          <Link to="/" className="hm-brand about-brand">
            <img
              src={projectLogo}
              alt="Project Studio logo"
              className="hm-logo"
            />
            <span className="hm-brand-text">Project Studio</span>
          </Link>
          <nav className="hm-nav-links" aria-label="Primary">
            <NavContent name="Home" link="/" />
            <NavContent name="Contact" link="/contact" />
          </nav>
        </div>
      </header>

      <main className="page-main about-main">
        <motion.section
          className="page-hero glass-panel about-hero"
          initial="hidden"
          animate="show"
          variants={heroVariants}
        >
          <p className="page-kicker">About Project Studio</p>
          <h1>
            Built to keep student projects sharp and client work organized.
          </h1>
          <p className="page-intro">
            Project Studio is a multi-page React + Vite experience for three
            kinds of work: CSE final-year project builds, small creative tasks,
            and professional business websites. The structure keeps each service
            focused, easy to compare, and simple to submit.
          </p>

          <div className="about-stat-grid">
            {aboutStats.map((stat) => (
              <article key={stat.label} className="about-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>

          <div className="page-hero-actions">
            <Link to="/contact" className="page-button page-button--primary">
              Start a request
            </Link>
            <Link to="/" className="page-button page-button--secondary">
              Back to home
            </Link>
          </div>
        </motion.section>

        <section className="content-grid about-grid">
          <motion.article
            className="info-card about-story"
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={cardVariants}
          >
            <p className="card-eyebrow">What this site does</p>
            <h2>One front door, three clear directions.</h2>
            <p>
              The home page acts like a service menu. Visitors move into the
              page that matches their goal, then use the request flow on that
              page to continue. That keeps the journey compact and avoids mixing
              very different project types.
            </p>
          </motion.article>

          <motion.article
            className="info-card about-design"
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={cardVariants}
          >
            <p className="card-eyebrow">Design language</p>
            <h2>Glossy surfaces, strong contrast, and a calm rhythm.</h2>
            <p>
              The visual system leans on layered gradients, glassy panels, and
              clear type so the site feels modern without becoming noisy. It
              stays readable on desktop and mobile, with motion only where it
              helps the page feel alive.
            </p>
          </motion.article>
        </section>

        <section className="section-block about-pillars">
          <div className="section-heading">
            <p className="page-kicker">Core ideas</p>
            <h2>What the studio prioritizes.</h2>
          </div>

          <div className="pillar-grid">
            {aboutPillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                className="pillar-card"
                custom={index}
                initial={reducedMotion ? false : "hidden"}
                whileInView={reducedMotion ? undefined : "show"}
                viewport={{ once: true, margin: "-120px" }}
                variants={cardVariants}
              >
                <span className="pillar-number">0{index + 1}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-block about-process">
          <div className="section-heading">
            <p className="page-kicker">How it works</p>
            <h2>Simple flow, no extra friction.</h2>
          </div>

          <div className="steps-grid">
            {workingSteps.map((step, index) => (
              <motion.article
                key={step}
                className="step-card"
                custom={index}
                initial={reducedMotion ? false : "hidden"}
                whileInView={reducedMotion ? undefined : "show"}
                viewport={{ once: true, margin: "-120px" }}
                variants={cardVariants}
              >
                <span className="step-index">{index + 1}</span>
                <p>{step}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="about-cta glass-panel">
          <div>
            <p className="page-kicker">Need the next step?</p>
            <h2>Open the contact page and choose the right route.</h2>
            <p>
              If you already know the service you want, jump straight to the
              contact page and continue from there. If not, the home page gives
              you the quickest overview.
            </p>
          </div>
          <div className="page-hero-actions">
            <Link to="/contact" className="page-button page-button--primary">
              Go to contact
            </Link>
            <Link to="/" className="page-button page-button--secondary">
              View services
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
