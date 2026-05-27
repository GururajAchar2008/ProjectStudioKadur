import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavContent } from "./NavContent";
import "./Contact.css";

const contactRoutes = [
  {
    title: "CSE Projects",
    copy: "Use this route for final-year project ideas, build packages, and project-ready screens.",
    href: "/cse-projects/",
  },
  {
    title: "Small Works",
    copy: "Use this route for PPTs, posters, flyers, banners, cleanup, and other fast creative tasks.",
    href: "/smallworks/",
  },
  {
    title: "Professional Projects",
    copy: "Use this route for business websites, quote building, add-ons, and polished client-style work.",
    href: "/professional-projects/",
  },
];

const contactChecklist = [
  "What service you need",
  "Your deadline or preferred timeline",
  "Any reference links or examples",
  "Project size, pages, slides, or features",
];

const contactStats = [
  { value: "3", label: "service routes" },
  { value: "1", label: "submission path" },
  { value: "0", label: "guesswork" },
];

const teamContacts = [
  {
    name: "Gururaj Achar",
    role: "Lead developer",
    contact: [
      {
        label: "Email",
        value: "achargururaj750@gmail.com",
        href: "mailto:achargururaj750@gmail.com",
      },
      {
        label: "Portfolio",
        value: "🌐 Developer Portfolio Website",
        href: "https://GururajAchar2008.github.io/Portfolio2.0/",
      },
      {
        label: "Phone",
        value: "+91 7899929173",
        href: "tel:+917899929173",
      },
    ],
  },
  {
    name: "Banuprakash J S",
    role: "Documentation and Development",
    contact: [
      {
        label: "Email",
        value: "shivaban30@gmail.com",
        href: "mailto:shivaban30@gmail.com",
      },
      {
        label: "Phone",
        value: "+91 8073254261",
        href: "tel:+918073254261",
      },
    ],
  },
  {
    name: "Goutham E",
    role: "Manager and Director",
    contact: [
      {
        label: "Email",
        value: "gowthameshwar60@gmail.com",
        href: "mailto:gowthameshwar60@gmail.com",
      },
      {
        label: "Phone",
        value: "+91 8217244152",
        href: "tel:+918217244152",
      },
    ],
  },
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

export const Contact = () => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = "Contact | Project Studio";
  }, []);

  const projectLogo = `${import.meta.env.BASE_URL}favicon.svg`;

  return (
    <div className="page-shell contact-page">
      <div className="ambient contact-ambient contact-ambient-a" />
      <div className="ambient contact-ambient contact-ambient-b" />

      <header className="hm-header page-header">
        <div className="hm-container flex-between">
          <Link to="/" className="hm-brand contact-brand">
            <img
              src={projectLogo}
              alt="Project Studio logo"
              className="hm-logo"
            />
            <span className="hm-brand-text">Project Studio</span>
          </Link>
          <nav className="hm-nav-links" aria-label="Primary">
            <NavContent name="Home" link="/home" />
            <NavContent name="About" link="/about" />
          </nav>
        </div>
      </header>

      <main className="page-main contact-main">
        <section className="section-block contact-team contact-team--top">
          <div className="section-heading">
            <p className="page-kicker">Contact details</p>
            <h2>People behind the studio.</h2>
          </div>

          <div className="team-grid">
            {teamContacts.map((person, index) => (
              <motion.article
                key={person.name}
                className="team-card"
                custom={index}
                initial={reducedMotion ? false : "hidden"}
                whileInView={reducedMotion ? undefined : "show"}
                viewport={{ once: true, margin: "-120px" }}
                variants={cardVariants}
              >
                <p className="card-eyebrow">Contact point</p>
                <h3>{person.name}</h3>
                <p className="team-role">{person.role}</p>
                <div className="team-contact-list">
                  {person.contact.map((item) => (
                    <a
                      key={`${person.name}-${item.label}`}
                      className="team-contact-link"
                      href={item.href}
                      target={item.label === "Portfolio" ? "_blank" : undefined}
                      rel={
                        item.label === "Portfolio" ? "noreferrer" : undefined
                      }
                    >
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </a>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <motion.section
          className="page-hero glass-panel contact-hero"
          initial="hidden"
          animate="show"
          variants={heroVariants}
        >
          <p className="page-kicker">Contact Project Studio</p>
          <h1>
            Choose the right service route, then send the details that matter.
          </h1>
          <p className="page-intro">
            The contact page is designed as a routing hub. If you already know
            your service, jump into the matching page. If you are still
            deciding, use the checklist below to prepare a clean brief before
            you submit.
          </p>

          <div className="contact-stat-grid">
            {contactStats.map((stat) => (
              <article key={stat.label} className="contact-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>

          <div className="page-hero-actions">
            <Link to="/" className="page-button page-button--primary">
              Browse services
            </Link>
            <Link to="/about" className="page-button page-button--secondary">
              Learn about the studio
            </Link>
          </div>
        </motion.section>

        <section className="content-grid contact-grid">
          <motion.article
            className="info-card contact-action-card"
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={cardVariants}
          >
            <p className="card-eyebrow">Best route selection</p>
            <h2>Pick the page that matches your brief.</h2>
            <div className="route-list">
              {contactRoutes.map((route) => (
                <Link key={route.title} to={route.href} className="route-card">
                  <span>{route.title}</span>
                  <p>{route.copy}</p>
                </Link>
              ))}
            </div>
          </motion.article>

          <motion.article
            className="info-card contact-checklist-card"
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={cardVariants}
          >
            <p className="card-eyebrow">What to include</p>
            <h2>Send the right details the first time.</h2>
            <ul className="checklist-list">
              {contactChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="contact-note">
              The service pages already capture the heavy details. The contact
              page is best used as a quick launch point for the right flow.
            </p>
          </motion.article>
        </section>

        <section className="section-block contact-support">
          <div className="section-heading">
            <p className="page-kicker">Need a quick path?</p>
            <h2>Use the studio as a guided menu, not a generic inbox.</h2>
          </div>

          <div className="support-grid">
            <motion.article
              className="support-card"
              custom={0}
              initial={reducedMotion ? false : "hidden"}
              whileInView={reducedMotion ? undefined : "show"}
              viewport={{ once: true, margin: "-120px" }}
              variants={cardVariants}
            >
              <span className="support-tag">Fastest start</span>
              <h3>Open the service that fits your goal.</h3>
              <p>
                The site is structured so every service has its own request
                flow, which keeps the process focused and easy to complete.
              </p>
            </motion.article>

            <motion.article
              className="support-card"
              custom={1}
              initial={reducedMotion ? false : "hidden"}
              whileInView={reducedMotion ? undefined : "show"}
              viewport={{ once: true, margin: "-120px" }}
              variants={cardVariants}
            >
              <span className="support-tag">Best for planning</span>
              <h3>Review the package details before you submit.</h3>
              <p>
                Compare the service options first so the request starts from the
                right size, timeline, and feature set.
              </p>
            </motion.article>

            <motion.article
              className="support-card support-card--accent"
              custom={2}
              initial={reducedMotion ? false : "hidden"}
              whileInView={reducedMotion ? undefined : "show"}
              viewport={{ once: true, margin: "-120px" }}
              variants={cardVariants}
            >
              <span className="support-tag">Still unsure?</span>
              <h3>Return to the home page for a quick overview.</h3>
              <p>
                The service menu on the home page is the shortest way to decide
                where your request belongs.
              </p>
            </motion.article>
          </div>
        </section>

        <section className="contact-cta glass-panel">
          <div>
            <p className="page-kicker">Ready to continue?</p>
            <h2>Pick a route and keep the request moving.</h2>
            <p>
              Every page in Project Studio is built to push the user toward the
              next clear step, and the contact page follows the same pattern.
            </p>
          </div>
          <div className="page-hero-actions">
            <Link
              to="/cse-projects/"
              className="page-button page-button--primary"
            >
              CSE Projects
            </Link>
            <Link
              to="/smallworks/"
              className="page-button page-button--secondary"
            >
              Small Works
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};
