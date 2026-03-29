import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'packages', label: 'Packages' },
  { id: 'process', label: 'Process' },
  { id: 'request', label: 'Request' },
];

const trustFeatures = [
  {
    title: 'Platform-ready intake',
    copy: 'Every request becomes a structured lead with the package, date, contact, and idea notes.',
  },
  {
    title: 'CSE only',
    copy: 'No branch selector. The experience is focused on diploma and engineering CSE students.',
  },
  {
    title: 'Smooth package flow',
    copy: 'Choose a package once and the form inherits it automatically across the page.',
  },
  {
    title: 'Refined, calm visuals',
    copy: 'Teal, blue, and glass surfaces give the site a fresh but trustworthy project-studio look.',
  },
];

const projects = [
  {
    title: 'Smart Attendance Desk',
    summary: 'A clean attendance tracker with role-based access, exportable reports, and dashboard filters.',
    stack: ['React', 'Node', 'MySQL'],
    accent: ['#0f766e', '#22d3ee'],
  },
  {
    title: 'Campus Events Portal',
    summary: 'A registration-first event site with live announcements, admin editing, and reminder flows.',
    stack: ['React', 'Express', 'MongoDB'],
    accent: ['#1d4ed8', '#38bdf8'],
  },
  {
    title: 'Placement Readiness Hub',
    summary: 'A placement support dashboard with resume sections, interview timelines, and progress cards.',
    stack: ['React', 'API', 'Dashboard'],
    accent: ['#059669', '#86efac'],
  },
  {
    title: 'Library Flow System',
    summary: 'A student-friendly issue and return tracker with search, history, and clear record keeping.',
    stack: ['UI', 'CRUD', 'Reports'],
    accent: ['#0f172a', '#14b8a6'],
  },
];

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Rs. 3,400',
    badge: 'Quick launch',
    summary: 'Best for simple mini projects and clean final-year submissions.',
    timeline: '5 to 7 days',
    support: '1 revision round',
    bullets: ['Responsive UI structure', 'Project roadmap guidance', 'Submission checklist'],
    tone: '#0ea5e9',
  },
  {
    id: 'builder',
    name: 'Builder Plus',
    price: 'Rs. 5,299',
    badge: 'Most chosen',
    summary: 'Balanced support for students who want a polished demo and project flow.',
    timeline: '7 to 12 days',
    support: '2 revision rounds',
    bullets: ['Frontend + backend planning', 'Database-friendly structure', 'Presentation-ready screens'],
    tone: '#14b8a6',
  },
  {
    id: 'signature',
    name: 'Signature Builder',
    price: 'Rs. 6,300',
    badge: 'Luxury finish',
    summary: 'For premium-looking showcases with deeper visual polish and stronger support.',
    timeline: '12 to 18 days',
    support: 'Priority support',
    bullets: ['Luxury UI motion', 'Deployment guidance', 'Documentation polish'],
    tone: '#f59e0b',
  },
];

const processSteps = [
  {
    title: 'Pick a package',
    copy: 'Tap the package that matches your submission timeline and project ambition.',
  },
  {
    title: 'Share your idea',
    copy: 'Describe your concept, or let us choose the idea direction for you.',
  },
  {
    title: 'Submit once',
    copy: 'The form is sent to the connected inbox with all typed details and the selected package.',
  },
];

const ideaSuggestions = [
  'Attendance tracker',
  'Campus event portal',
  'Placement dashboard',
  'Library manager',
  'Project showcase site',
  'Exam prep hub',
];

const projectLogo = `${import.meta.env.BASE_URL}favicon.svg`;

const formDefaults = () => ({
  fullName: '',
  collegeName: '',
  contact: '',
  submissionDate: '',
  ideaMode: 'guided',
  projectIdea: '',
  notes: '',
});

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function resolveInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  try {
    const stored = window.localStorage.getItem('project-studio-theme');

    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch (error) {
    // Some browsers block localStorage in private or hardened modes.
  }

  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function escapeHtml(input) {
  return String(input)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatDate(value) {
  if (!value) {
    return 'Pending';
  }

  const parsed = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
  }).format(parsed);
}

function displayValue(value, fallback = 'Pending') {
  return String(value || '').trim() || fallback;
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={onToggle}
    >
      <span className="theme-toggle__label">Light</span>
      <span className="theme-toggle__track">
        <span className={`theme-toggle__thumb theme-toggle__thumb--${theme}`} />
      </span>
      <span className="theme-toggle__label">Dark</span>
    </button>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.article className="project-card" variants={itemVariants} whileHover={{ y: -8 }}>
      <div
        className="project-card__preview"
        style={{
          background: `linear-gradient(135deg, ${project.accent[0]}, ${project.accent[1]})`,
        }}
      >
        <div className="project-card__chrome">
          <span />
          <span />
          <span />
        </div>
        <div className="project-card__mock">
          <span className="project-card__line project-card__line--wide" />
          <span className="project-card__line" />
          <span className="project-card__line" />
          <div className="project-card__grid">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className="project-card__body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tag-row">
          {project.stack.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function PackageCard({ packageItem, active, onSelect }) {
  return (
    <motion.button
      type="button"
      className={`package-card ${active ? 'package-card--active' : ''}`}
      variants={itemVariants}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(packageItem.id)}
    >
      <div
        className="package-card__accent"
        style={{
          background: `linear-gradient(135deg, ${packageItem.tone}, rgba(255, 255, 255, 0))`,
        }}
      />
      <div className="package-card__top">
        <div className="package-card__top-left">
          <span className="package-card__badge">{packageItem.badge}</span>
          {active ? <span className="package-card__selected">Selected</span> : null}
        </div>
        <div className="package-card__price">
          <span>Price</span>
          <strong>{packageItem.price}</strong>
        </div>
      </div>
      <h3>{packageItem.name}</h3>
      <p>{packageItem.summary}</p>
      <ul>
        {packageItem.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="package-card__footer">
        <span>
          <small>Timeline</small>
          <strong>{packageItem.timeline}</strong>
        </span>
        <span>
          <small>Support</small>
          <strong>{packageItem.support}</strong>
        </span>
      </div>
    </motion.button>
  );
}

function App() {
  const [theme, setTheme] = useState(resolveInitialTheme);
  const [selectedPackageId, setSelectedPackageId] = useState('starter');
  const [form, setForm] = useState(formDefaults);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState({
    kind: 'idle',
    message: '',
  });

  const activePackage = packages.find((item) => item.id === selectedPackageId) ?? packages[1];
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    try {
      window.localStorage.setItem('project-studio-theme', theme);
    } catch (error) {
      // Ignore storage failures and keep the app usable.
    }
  }, [theme]);

  useEffect(() => {
    document.title = 'Project Studio | CSE Final-Year Builds';
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const clearStatus = () => {
    setStatus({
      kind: 'idle',
      message: '',
    });
  };

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    clearStatus();
  };

  const handlePackageSelect = (id) => {
    setSelectedPackageId(id);
    clearStatus();
  };

  const navigateToSection = (id) => {
    setIsMobileMenuOpen(false);
    window.requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="ambient ambient-c" />

      <header className="topbar">
        <button
          className="brand"
          type="button"
          onClick={() => navigateToSection("home")}
        >
          <img
            className="brand-mark"
            src={projectLogo}
            alt=""
            aria-hidden="true"
          />
          <span className="brand-copy">
            <strong>Project Studio</strong>
            <small>CSE final-year builds</small>
          </span>
        </button>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="nav-link"
              onClick={() => navigateToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <ThemeToggle
          theme={theme}
          onToggle={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
        />
        <button
          type="button"
          className={`menu-toggle ${isMobileMenuOpen ? "menu-toggle--open" : ""}`}
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="mobile-menu__backdrop"
              aria-label="Close navigation menu"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.aside
              id="mobile-menu"
              className="mobile-menu__panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}
            >
              <div className="mobile-menu__header">
                <div>
                  <span>Navigation</span>
                  <strong>Project Studio</strong>
                </div>
                <button
                  type="button"
                  className="mobile-menu__close"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ×
                </button>
              </div>

              <nav className="mobile-menu__nav" aria-label="Mobile primary">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="mobile-menu__link"
                    onClick={() => navigateToSection(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mobile-menu__section">
                <span className="mobile-menu__eyebrow">Theme</span>
                <ThemeToggle
                  theme={theme}
                  onToggle={() =>
                    setTheme((current) =>
                      current === "dark" ? "light" : "dark",
                    )
                  }
                />
              </div>

              <div className="mobile-menu__section mobile-menu__section--note">
                <span className="mobile-menu__eyebrow">Quick note</span>
                <p>
                  Use the drawer to jump between sections and switch the look
                  without leaving the menu.
                </p>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="main-shell">
        <motion.section
          className="panel hero-panel"
          id="home"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="hero-copy">
            <span className="eyebrow eyebrow--hero">
              Diploma / Engineering CSE only
            </span>
            <h1>
              Premium CSE project builds that feel trustworthy on the first
              glance.
            </h1>
            <p className="hero-text">
              Students can browse previous-style showcases, compare prices up
              front, pick a package, and submit a clean request where the
              selected package is carried automatically into the form.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="button button-primary"
                onClick={() => scrollToSection("packages")}
              >
                Explore packages
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => scrollToSection("request")}
              >
                Start request
              </button>
            </div>
            <div className="hero-stats">
              <div>
                <strong>{packages[0].price}</strong>
                <span>Starter price</span>
              </div>
              <div>
                <strong>Responsive</strong>
                <span>All screens</span>
              </div>
              <div>
                <strong>Fast handoff</strong>
                <span>Form platform</span>
              </div>
            </div>
            <div className="hero-notes">
              <span className="note-chip">No branch selector</span>
              <span className="note-chip">Package auto-filled</span>
              <span className="note-chip">Form platform handoff</span>
            </div>
          </div>

          <motion.div className="hero-visual" variants={itemVariants}>
            <div className="hero-visual__card">
              <div className="hero-visual__top">
                <span className="hero-visual__status">
                  Live package preview
                </span>
                <span className="hero-visual__badge">
                  {activePackage.badge}
                </span>
              </div>
              <h2>{activePackage.name}</h2>
              <div className="hero-visual__price">
                <span>Current price</span>
                <strong>{activePackage.price}</strong>
              </div>
              <p>{activePackage.summary}</p>

              <div className="feature-list">
                {activePackage.bullets.map((bullet) => (
                  <div className="feature-row" key={bullet}>
                    <span className="feature-dot" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="hero-visual__meta">
                <div>
                  <span>Timeline</span>
                  <strong>{activePackage.timeline}</strong>
                </div>
                <div>
                  <span>Support</span>
                  <strong>{activePackage.support}</strong>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          className="panel trust-panel"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={sectionVariants}
        >
          <SectionHeading
            eyebrow="Trust first"
            title="Designed to reassure students before they even fill the form."
            copy="The layout keeps the experience clear, direct, and premium so the first glance feels organized instead of crowded."
          />

          <motion.div className="trust-grid" variants={listVariants}>
            {trustFeatures.map((feature) => (
              <motion.article
                className="trust-card"
                key={feature.title}
                variants={itemVariants}
              >
                <span className="trust-card__mark" />
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="panel"
          id="projects"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={sectionVariants}
        >
          <SectionHeading
            eyebrow="Featured projects"
            title="A quick look at the kinds of builds we present."
            copy="These showcase cards are structured to be swapped with your real project screenshots whenever you are ready."
          />

          <motion.div className="project-grid" variants={listVariants}>
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="panel"
          id="packages"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={sectionVariants}
        >
          <SectionHeading
            eyebrow="Packages"
            title="Choose the build level, then let the form carry it forward automatically."
            copy="Tap a package card and the request form will reflect the selection without asking for branch details."
          />

          <motion.div className="package-grid" variants={listVariants}>
            {packages.map((packageItem) => (
              <PackageCard
                key={packageItem.id}
                packageItem={packageItem}
                active={selectedPackageId === packageItem.id}
                onSelect={handlePackageSelect}
              />
            ))}
          </motion.div>

          <p className="section-footnote">
            The package selection stays active as you move into the request
            form, so students do not have to repeat the same choice twice.
          </p>
        </motion.section>

        <motion.section
          className="panel"
          id="process"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={sectionVariants}
        >
          <SectionHeading
            eyebrow="Process"
            title="The flow stays simple and easy to follow."
            copy="Three calm steps: pick, explain, and submit. No branch selector clutter and no confusing detours."
          />

          <motion.div className="process-grid" variants={listVariants}>
            {processSteps.map((step, index) => (
              <motion.article
                className="process-card"
                key={step.title}
                variants={itemVariants}
              >
                <span className="process-card__index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="panel request-panel"
          id="request"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={sectionVariants}
        >
          <SectionHeading
            eyebrow="Request form"
            title="Fill once, submit once, and let us forward the details."
            copy="The form keeps the package, deadline, contact details, and idea notes in one clear place."
          />

          <div className="request-grid">
            <motion.form
              className="request-form"
              action="https://usebasin.com/f/b0ea3893312a"
              method="POST"
              variants={itemVariants}
            >
              <div className="form-header">
                <div>
                  <p className="form-label">Request details</p>
                  <h3>Share the details that matter.</h3>
                </div>

                <div className="selected-package-card">
                  <span>Selected package</span>
                  <strong>{activePackage.name}</strong>
                  <small>{activePackage.price}</small>
                </div>
              </div>

              <input
                type="hidden"
                name="_subject"
                value={`Project Studio request - ${activePackage.name}`}
              />
              <input
                type="hidden"
                name="selectedPackageId"
                value={selectedPackageId}
              />
              <input
                type="hidden"
                name="selectedPackageName"
                value={activePackage.name}
              />
              <input
                type="hidden"
                name="selectedPackageSummary"
                value={activePackage.summary}
              />
              <input
                type="hidden"
                name="selectedPackagePrice"
                value={activePackage.price}
              />
              <input
                type="hidden"
                name="selectedPackageTimeline"
                value={activePackage.timeline}
              />
              <input
                type="hidden"
                name="selectedPackageSupport"
                value={activePackage.support}
              />
              <input type="hidden" name="ideaMode" value={form.ideaMode} />
              <input
                type="hidden"
                name="_replyto"
                value={form.contact.includes("@") ? form.contact.trim() : ""}
              />

              <div className="form-grid">
                <label className="field">
                  <span>Full name</span>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    placeholder="Your name"
                    required
                  />
                </label>

                <label className="field">
                  <span>College name</span>
                  <input
                    type="text"
                    name="collegeName"
                    value={form.collegeName}
                    onChange={(event) =>
                      updateField("collegeName", event.target.value)
                    }
                    placeholder="College / institute name"
                    required
                  />
                </label>

                <label className="field">
                  <span>Contact information</span>
                  <input
                    type="text"
                    name="contact"
                    value={form.contact}
                    onChange={(event) =>
                      updateField("contact", event.target.value)
                    }
                    placeholder="Gmail or phone number"
                    required
                  />
                </label>

                <label className="field">
                  <span>Final submission date</span>
                  <input
                    type="date"
                    name="submissionDate"
                    min={today}
                    value={form.submissionDate}
                    onChange={(event) =>
                      updateField("submissionDate", event.target.value)
                    }
                    required
                  />
                </label>
              </div>

              <fieldset className="idea-mode">
                <legend>Idea flow</legend>
                <div className="radio-grid">
                  <button
                    type="button"
                    className={`radio-card ${form.ideaMode === "guided" ? "radio-card--active" : ""}`}
                    onClick={() => updateField("ideaMode", "guided")}
                  >
                    <strong>Let us choose</strong>
                    <span>
                      We suggest the project direction and shape the concept
                      with you.
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`radio-card ${form.ideaMode === "own" ? "radio-card--active" : ""}`}
                    onClick={() => updateField("ideaMode", "own")}
                  >
                    <strong>I have my own idea</strong>
                    <span>
                      You already know the concept and want to describe it
                      directly.
                    </span>
                  </button>
                </div>
              </fieldset>

              <div className="idea-panel">
                <div className="idea-panel__header">
                  <span>Project idea or preference</span>
                  <span className="idea-helper">
                    {form.ideaMode === "guided"
                      ? "Pick a starting point below or type a preferred direction."
                      : "Describe the concept, features, or reference apps you want."}
                  </span>
                </div>

                <div className="idea-chips" aria-label="Idea suggestions">
                  {ideaSuggestions.map((suggestion) => (
                    <button
                      type="button"
                      key={suggestion}
                      className={`idea-chip ${form.projectIdea === suggestion ? "idea-chip--active" : ""}`}
                      onClick={() => updateField("projectIdea", suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <label className="field field--stacked">
                  <span>
                    {form.ideaMode === "guided"
                      ? "Preferred direction"
                      : "Describe your idea"}
                  </span>
                  <textarea
                    name="projectIdea"
                    value={form.projectIdea}
                    onChange={(event) =>
                      updateField("projectIdea", event.target.value)
                    }
                    placeholder={
                      form.ideaMode === "guided"
                        ? "Example: something useful for attendance, college admin, placement, or project showcase."
                        : "Tell us what the app should do, what modules you need, and what you want the UI to feel like."
                    }
                    rows="6"
                  />
                </label>
              </div>

              <label className="field field--stacked">
                <span>Extra notes</span>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Add any deadline pressure, must-have features, tech preferences, or reference links."
                  rows="4"
                />
              </label>

              <div className="form-actions">
                <button
                  type="submit"
                  className="button button-primary button-submit"
                >
                  Submit request
                </button>
                <p className="form-note">
                  Your request will go directly to the configured form endpoint
                  with the selected package and submitted details.
                </p>
              </div>

              <AnimatePresence>
                {status.kind === "error" ? (
                  <motion.div
                    className="status-banner status-banner--error"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                  >
                    <strong>Submission failed</strong>
                    <p>{status.message}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <p className="privacy-note">
                Only for diploma and engineering CSE students. No branch
                selector is shown anywhere on this platform.
              </p>
            </motion.form>

            <motion.aside className="request-summary" variants={itemVariants}>
              <p className="form-label">Live summary</p>
              <h3>What the submission will contain</h3>

              <div className="summary-card">
                <div>
                  <span>Package</span>
                  <strong>{activePackage.name}</strong>
                </div>
                <div>
                  <span>Student</span>
                  <strong>{displayValue(form.fullName)}</strong>
                </div>
                <div>
                  <span>College</span>
                  <strong>{displayValue(form.collegeName)}</strong>
                </div>
                <div>
                  <span>Contact</span>
                  <strong>{displayValue(form.contact)}</strong>
                </div>
                <div>
                  <span>Price</span>
                  <strong>{activePackage.price}</strong>
                </div>
                <div>
                  <span>Deadline</span>
                  <strong>{formatDate(form.submissionDate)}</strong>
                </div>
                <div>
                  <span>Idea mode</span>
                  <strong>
                    {form.ideaMode === "guided"
                      ? "Let us choose"
                      : "I have my own idea"}
                  </strong>
                </div>
                <div className="summary-card__wide">
                  <span>Idea</span>
                  <strong>{displayValue(form.projectIdea)}</strong>
                </div>
                <div className="summary-card__wide">
                  <span>Notes</span>
                  <strong>{displayValue(form.notes)}</strong>
                </div>
              </div>

              <div className="summary-note">
                <strong>Trusted flow</strong>
                <p>
                  The form does not ask for branch selection. The package is
                  carried forward automatically, and the submission goes
                  straight to the connected platform without a custom backend.
                </p>
              </div>

              <div className="summary-chips">
                <span>Quick response route</span>
                <span>No branch selector</span>
                <span>CSE only</span>
              </div>
            </motion.aside>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <div>
          <strong>Project Studio</strong>
          <p>
            Built for diploma and engineering CSE students who want a clear,
            premium, and trustworthy request flow.
          </p>
        </div>

        <div className="footer-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="footer-link"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;
