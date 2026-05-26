import { AnimatePresence, motion } from "framer-motion";
import { StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const projectLogo = "../favicon.svg";

const contentModes = [
  {
    id: "ready",
    title: "Content ready",
    copy: "You already have the text, points, or reference notes.",
  },
  {
    id: "needs_help",
    title: "Need content help",
    copy: "You want help shaping the message or slide flow.",
  },
  {
    id: "design_only",
    title: "Design only",
    copy: "The content is mostly fixed and you need the layout finished.",
  },
];

const speedModes = [
  {
    id: "standard",
    title: "Standard",
    copy: "Normal turnaround with the best value.",
  },
  {
    id: "urgent",
    title: "Urgent",
    copy: "Faster delivery with a rush fee added.",
  },
];

const smallWorkOffers = [
  {
    id: "ppt",
    name: "PPT Making",
    priceLabel: "From Rs. 699",
    badge: "Student deck",
    summary:
      "Quick, readable PowerPoint decks for seminars, project demos, and reviews.",
    description:
      "Best when you already have the content and want the slides shaped into a clean flow with speaker notes.",
    timeline: "Same day to 24 hours",
    support: "1 revision round",
    quantityLabel: "Slides",
    defaultQuantity: 10,
    quantityHint: "Base price includes up to 10 slides.",
    basePrice: 699,
    includedQuantity: 10,
    extraUnitPrice: 60,
    rushFee: 300,
    outputs: ["PPTX + PDF", "PPTX only", "PDF only"],
    bullets: [
      "Up to 10 slides included",
      "PPTX + PDF delivery",
      "Speaker notes cleanup",
    ],
    tone: "#2563eb",
  },
  {
    id: "poster",
    name: "Poster / Flyer",
    priceLabel: "From Rs. 599",
    badge: "Single creative",
    summary:
      "Event posters, seminar flyers, WhatsApp notices, and simple promo graphics.",
    description:
      "Best for one clear visual with strong typography and a print-ready layout.",
    timeline: "Same day to 2 days",
    support: "1 revision round",
    quantityLabel: "Designs",
    defaultQuantity: 1,
    quantityHint: "Base price covers 1 poster or flyer.",
    basePrice: 599,
    includedQuantity: 1,
    extraUnitPrice: 200,
    rushFee: 250,
    outputs: ["PNG + PDF", "PNG only", "PDF only"],
    bullets: ["1 poster or flyer", "PNG + PDF delivery", "Print-ready sizing"],
    tone: "#0f766e",
  },
  {
    id: "social",
    name: "Social Post",
    priceLabel: "From Rs. 299",
    badge: "Quick content",
    summary:
      "Instagram, Facebook, and WhatsApp creatives for announcements or promotions.",
    description:
      "Great for simple announcement cards, quote posts, and short promo visuals.",
    timeline: "Same day",
    support: "1 revision round",
    quantityLabel: "Posts",
    defaultQuantity: 1,
    quantityHint: "Base price covers 1 static post.",
    basePrice: 299,
    includedQuantity: 1,
    extraUnitPrice: 120,
    rushFee: 150,
    outputs: ["PNG", "JPG"],
    bullets: ["1 static post", "PNG/JPG delivery", "Brand colour matching"],
    tone: "#64748b",
  },
  {
    id: "brochure",
    name: "Brochure / Menu",
    priceLabel: "From Rs. 1,499",
    badge: "Multi-page",
    summary: "Short brochures, mini catalogues, menus, and profile sheets.",
    description:
      "Best for 2 to 4 pages with clean layout and editable source files.",
    timeline: "1 to 3 days",
    support: "2 revision rounds",
    quantityLabel: "Pages",
    defaultQuantity: 2,
    quantityHint: "Base price covers 2 pages.",
    basePrice: 1499,
    includedQuantity: 2,
    extraUnitPrice: 300,
    rushFee: 350,
    outputs: ["PDF", "Source file"],
    bullets: ["2-page base", "PDF + source file", "Print-ready layout"],
    tone: "#334155",
  },
  {
    id: "banner",
    name: "Thumbnail / Banner",
    priceLabel: "From Rs. 349",
    badge: "Quick asset",
    summary:
      "YouTube thumbnails, webinar banners, cover images, and simple hero graphics.",
    description: "A focused one-piece design built to catch attention fast.",
    timeline: "Same day",
    support: "1 revision round",
    quantityLabel: "Creatives",
    defaultQuantity: 1,
    quantityHint: "Base price covers 1 creative.",
    basePrice: 349,
    includedQuantity: 1,
    extraUnitPrice: 100,
    rushFee: 100,
    outputs: ["PNG", "Source file"],
    bullets: ["1 creative asset", "PNG + source file", "Web ready"],
    tone: "#b45309",
  },
  {
    id: "cleanup",
    name: "Formatting / Cleanup",
    priceLabel: "From Rs. 249",
    badge: "Small task",
    summary:
      "Alignment fixes, text cleanup, PDF polishing, and small design corrections.",
    description:
      "Ideal for quick freelancer tasks that just need a neat final finish.",
    timeline: "Within 24 hours",
    support: "1 revision round",
    quantityLabel: "Files",
    defaultQuantity: 1,
    quantityHint: "Base price covers 1 file or document.",
    basePrice: 249,
    includedQuantity: 1,
    extraUnitPrice: 50,
    rushFee: 100,
    outputs: ["PDF", "Editable file"],
    bullets: ["1 file or doc", "Spacing and alignment fix", "PDF cleanup"],
    tone: "#6b7280",
  },
];

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
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const stored = window.localStorage.getItem("project-studio-theme");

    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch (error) {
    // Some browsers block localStorage in private or hardened modes.
  }

  return "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const themeColor = document.querySelector('meta[name="theme-color"]');

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      theme === "dark" ? "#030303" : "#fafafa",
    );
  }
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function formatDate(value) {
  if (!value) {
    return "Pending";
  }

  const parsed = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(parsed);
}

function displayValue(value, fallback = "Pending") {
  return String(value || "").trim() || fallback;
}

function formatMoney(value) {
  return `Rs. ${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value)}`;
}

function resolveHomeUrl() {
  if (typeof window === "undefined") {
    return "/";
  }

  return new URL("../", window.location.href).href;
}

function resolveThankYouUrl() {
  if (typeof window === "undefined") {
    return "/thankyou/";
  }

  return new URL("../thankyou/", window.location.href).href;
}

function resolveProfessionalProjectsUrl() {
  if (typeof window === "undefined") {
    return "/professional-projects/";
  }

  return new URL("../professional-projects/", window.location.href).href;
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
  const nextTheme = theme === "dark" ? "light" : "dark";

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

function SmallWorkCard({ work, active, onSelect }) {
  return (
    <motion.button
      type="button"
      className={`package-card ${active ? "package-card--active" : ""}`}
      variants={itemVariants}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(work.id)}
      aria-pressed={active}
    >
      <div
        className="package-card__accent"
        style={{
          background: `linear-gradient(135deg, ${work.tone}, rgba(255, 255, 255, 0))`,
        }}
      />
      <div className="package-card__top">
        <div className="package-card__top-left">
          <span className="package-card__badge">{work.badge}</span>
          {active ? (
            <span className="package-card__selected">Selected</span>
          ) : null}
        </div>
        <div className="package-card__price">
          <span>Starting rate</span>
          <strong>{work.priceLabel}</strong>
        </div>
      </div>
      <h3>{work.name}</h3>
      <p>{work.summary}</p>
      <p className="package-card__description">{work.description}</p>
      <ul>
        {work.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="package-card__footer">
        <span>
          <small>Turnaround</small>
          <strong>{work.timeline}</strong>
        </span>
        <span>
          <small>Support</small>
          <strong>{work.support}</strong>
        </span>
      </div>
    </motion.button>
  );
}

function getBriefPlaceholder(workId) {
  switch (workId) {
    case "ppt":
      return "Topic, slide count, and any reference PDF or notes.";
    case "poster":
      return "Event name, size, colours, and the message to highlight.";
    case "social":
      return "Caption, offer, or announcement text for the post.";
    case "brochure":
      return "Page order, copy, and print size or menu details.";
    case "banner":
      return "Channel, size, and the main call to action.";
    case "cleanup":
      return "What needs fixing and which file needs the update.";
    default:
      return "Share the main brief, reference links, and any must-have details.";
  }
}

function estimatePrice(work, form) {
  const quantity = Math.max(
    1,
    Number.parseInt(form.workCount, 10) || work.defaultQuantity,
  );
  const extraUnits = Math.max(0, quantity - work.includedQuantity);
  const rushFee = form.deliverySpeed === "urgent" ? work.rushFee : 0;

  return work.basePrice + extraUnits * work.extraUnitPrice + rushFee;
}

function formDefaults(work) {
  return {
    fullName: "",
    businessName: "",
    contact: "",
    deadline: "",
    workCount: String(work.defaultQuantity),
    deliverySpeed: "standard",
    contentStatus: "ready",
    preferredOutput: work.outputs[0],
    referenceLink: "",
    brief: "",
    notes: "",
  };
}

function SmallWorksPage() {
  const [theme, setTheme] = useState(resolveInitialTheme);
  const [selectedWorkId, setSelectedWorkId] = useState("ppt");
  const [form, setForm] = useState(() => formDefaults(smallWorkOffers[0]));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const homeUrl = resolveHomeUrl();
  const thankYouUrl = resolveThankYouUrl();
  const professionalProjectsUrl = resolveProfessionalProjectsUrl();
  const selectedWork =
    smallWorkOffers.find((work) => work.id === selectedWorkId) ??
    smallWorkOffers[0];
  const estimatedPrice = estimatePrice(selectedWork, form);
  const headerItems = [
    {
      id: "project-builds",
      label: "Project builds",
      type: "link",
      href: homeUrl,
    },
    {
      id: "professional-projects",
      label: "Professional projects",
      type: "link",
      href: professionalProjectsUrl,
    },
    { id: "services", label: "Services", type: "section" },
    { id: "request", label: "Request", type: "section" },
  ];

  useEffect(() => {
    applyTheme(theme);

    try {
      window.localStorage.setItem("project-studio-theme", theme);
    } catch (error) {
      // Ignore storage failures and keep the page usable.
    }
  }, [theme]);

  useEffect(() => {
    document.title = "Small Works | Project Studio";
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      workCount: String(selectedWork.defaultQuantity),
      preferredOutput: selectedWork.outputs[0],
    }));
  }, [selectedWork.id]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleWorkSelect(workId) {
    setSelectedWorkId(workId);
  }

  function handleMenuItem(item) {
    setIsMenuOpen(false);

    if (item.type === "link") {
      window.location.href = item.href;
      return;
    }

    window.requestAnimationFrame(() => scrollToSection(item.id));
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="ambient ambient-c" />

      <header className="topbar">
        <a className="brand" href={homeUrl}>
          <img
            className="brand-mark"
            src={projectLogo}
            alt=""
            aria-hidden="true"
          />
          <span className="brand-copy">
            <strong>Project Studio</strong>
            <small>Small freelance works</small>
          </span>
        </a>

        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? "menu-toggle--open" : ""}`}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="small-works-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
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
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.aside
              id="small-works-menu"
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
                  onClick={() => setIsMenuOpen(false)}
                >
                  ×
                </button>
              </div>

              <nav
                className="mobile-menu__nav"
                aria-label="Small works primary"
              >
                {headerItems.map((item) =>
                  item.type === "link" ? (
                    <a
                      key={item.id}
                      className="mobile-menu__link"
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      key={item.id}
                      type="button"
                      className="mobile-menu__link"
                      onClick={() => handleMenuItem(item)}
                    >
                      {item.label}
                    </button>
                  ),
                )}
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
                  The quick-work links and theme switch live in the drawer so
                  the top bar stays clean on every screen.
                </p>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="main-shell">
        <motion.section
          className="panel hero-panel"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="hero-copy">
            <span className="eyebrow eyebrow--hero">
              Small assignments and quick design help
            </span>
            <h1>
              Fast-turnaround PPTs, posters, and other small freelance jobs.
            </h1>
            <p className="hero-text">
              This page is for one-off work like presentation decks, poster
              design, social media creatives, thumbnails, banners, and light
              formatting. Prices start from current Indian freelance ranges and
              move with slide count, urgency, and how much content is ready.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="button button-primary"
                onClick={() => scrollToSection("services")}
              >
                Browse services
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
                <strong>Rs. 699</strong>
                <span>PPT start</span>
              </div>
              <div>
                <strong>Rs. 599</strong>
                <span>Poster start</span>
              </div>
              <div>
                <strong>Rs. 299</strong>
                <span>Social post</span>
              </div>
            </div>
            <div className="hero-notes">
              <span className="note-chip">One-off jobs</span>
              <span className="note-chip">Market-aligned starting prices</span>
              <span className="note-chip">Fast handoff</span>
            </div>
          </div>

          <motion.div className="hero-visual" variants={itemVariants}>
            <div
              className="hero-visual__card"
              style={{
                boxShadow: `0 10px 26px rgba(15, 23, 42, 0.06)`,
              }}
            >
              <div className="hero-visual__top">
                <span className="hero-visual__status">Live quote preview</span>
                <span className="hero-visual__badge">{selectedWork.badge}</span>
              </div>
              <h2>{selectedWork.name}</h2>
              <div className="hero-visual__price">
                <span>Starting rate</span>
                <strong>{selectedWork.priceLabel}</strong>
              </div>
              <p>{selectedWork.summary}</p>

              <div className="feature-list">
                {selectedWork.bullets.map((bullet) => (
                  <div className="feature-row" key={bullet}>
                    <span className="feature-dot" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="hero-visual__meta">
                <div>
                  <span>Estimate</span>
                  <strong>{formatMoney(estimatedPrice)}</strong>
                </div>
                <div>
                  <span>Output</span>
                  <strong>{form.preferredOutput}</strong>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          className="panel"
          id="services"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={sectionVariants}
        >
          <SectionHeading
            eyebrow="Small works"
            title="Pick the quick job, then let the form carry the details forward."
            copy="Each card uses market-friendly starting prices for simple student and freelancer tasks. Select one, then the estimate updates automatically."
          />

          <motion.div className="package-grid" variants={listVariants}>
            {smallWorkOffers.map((work) => (
              <SmallWorkCard
                key={work.id}
                work={work}
                active={selectedWorkId === work.id}
                onSelect={handleWorkSelect}
              />
            ))}
          </motion.div>

          <p className="section-footnote">
            The listed prices are starting rates for simple briefs. A heavier
            workload, more revisions, or last-minute delivery can move the final
            quote.
          </p>
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
            title="Send the brief once and we will shape the quote around it."
            copy="The form is tuned for quick work: a service pick, a few details, the deadline, and the output you want back."
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
                  <h3>Tell us what needs to be made.</h3>
                </div>

                <div className="selected-package-card">
                  <span>Selected work</span>
                  <strong>{selectedWork.name}</strong>
                  <small>{selectedWork.priceLabel}</small>
                </div>
              </div>

              <input
                type="hidden"
                name="subject"
                value={`Project Studio small work - ${selectedWork.name}`}
              />
              <input
                type="hidden"
                name="selectedWorkId"
                value={selectedWorkId}
              />
              <input
                type="hidden"
                name="selectedWorkName"
                value={selectedWork.name}
              />
              <input
                type="hidden"
                name="selectedWorkPriceLabel"
                value={selectedWork.priceLabel}
              />
              <input
                type="hidden"
                name="selectedWorkEstimatedPrice"
                value={formatMoney(estimatedPrice)}
              />
              <input
                type="hidden"
                name="selectedWorkQuantity"
                value={form.workCount}
              />
              <input
                type="hidden"
                name="selectedWorkSpeed"
                value={form.deliverySpeed}
              />
              <input
                type="hidden"
                name="selectedWorkOutput"
                value={form.preferredOutput}
              />
              <input
                type="hidden"
                name="selectedWorkContentStatus"
                value={form.contentStatus}
              />
              <input type="hidden" name="redirect" value={thankYouUrl} />
              <input
                type="checkbox"
                name="botcheck"
                className="none"
                tabIndex={-1}
                aria-hidden="true"
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
                  <span>College or business name</span>
                  <input
                    type="text"
                    name="businessName"
                    value={form.businessName}
                    onChange={(event) =>
                      updateField("businessName", event.target.value)
                    }
                    placeholder="Institute, shop, or brand name"
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
                    placeholder="Gmail, phone number, or WhatsApp"
                    required
                  />
                </label>

                <label className="field">
                  <span>Deadline</span>
                  <input
                    type="date"
                    name="deadline"
                    min={new Date().toISOString().slice(0, 10)}
                    value={form.deadline}
                    onChange={(event) =>
                      updateField("deadline", event.target.value)
                    }
                    required
                  />
                </label>

                <label className="field">
                  <span>{selectedWork.quantityLabel}</span>
                  <input
                    type="number"
                    name="workCount"
                    min="1"
                    step="1"
                    value={form.workCount}
                    onChange={(event) =>
                      updateField("workCount", event.target.value)
                    }
                    required
                  />
                </label>

                <div className="field">
                  <span>Quantity note</span>
                  <div className="summary-note">
                    <p>{selectedWork.quantityHint}</p>
                  </div>
                </div>
              </div>

              <fieldset className="idea-mode">
                <legend>Content readiness</legend>
                <div className="radio-grid">
                  {contentModes.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      className={`radio-card ${form.contentStatus === mode.id ? "radio-card--active" : ""}`}
                      onClick={() => updateField("contentStatus", mode.id)}
                    >
                      <strong>{mode.title}</strong>
                      <span>{mode.copy}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="idea-mode">
                <legend>Delivery speed</legend>
                <div className="radio-grid">
                  {speedModes.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      className={`radio-card ${form.deliverySpeed === mode.id ? "radio-card--active" : ""}`}
                      onClick={() => updateField("deliverySpeed", mode.id)}
                    >
                      <strong>{mode.title}</strong>
                      <span>{mode.copy}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="idea-panel">
                <div className="idea-panel__header">
                  <span>Preferred output</span>
                  <span className="idea-helper">
                    Choose the file type you want back after delivery.
                  </span>
                </div>

                <div
                  className="idea-chips"
                  aria-label="Preferred output options"
                >
                  {selectedWork.outputs.map((output) => (
                    <button
                      type="button"
                      key={output}
                      className={`idea-chip ${form.preferredOutput === output ? "idea-chip--active" : ""}`}
                      onClick={() => updateField("preferredOutput", output)}
                    >
                      {output}
                    </button>
                  ))}
                </div>

                <label className="field field--stacked">
                  <span>Short brief</span>
                  <textarea
                    name="brief"
                    value={form.brief}
                    onChange={(event) =>
                      updateField("brief", event.target.value)
                    }
                    placeholder={getBriefPlaceholder(selectedWork.id)}
                    rows="5"
                  />
                </label>
              </div>

              <label className="field field--stacked">
                <span>Extra notes</span>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Add brand notes, print instructions, or any extra instruction."
                  rows="4"
                />
              </label>

              <label className="field field--stacked">
                <span>Reference link</span>
                <input
                  type="text"
                  name="referenceLink"
                  value={form.referenceLink}
                  onChange={(event) =>
                    updateField("referenceLink", event.target.value)
                  }
                  placeholder="Paste any reference URL here"
                />
              </label>

              <div className="form-actions">
                <button
                  type="submit"
                  className="button button-primary button-submit"
                >
                  Send small-work request
                </button>
                <p className="form-note">
                  This request goes to the same form inbox and then redirects to
                  the shared thank-you page after submission.
                </p>
              </div>

              <p className="privacy-note">
                Built for students, creators, and small businesses that need a
                fast quote for a short task.
              </p>
            </motion.form>

            <motion.aside className="request-summary" variants={itemVariants}>
              <p className="form-label">Live summary</p>
              <h3>What the submission will contain</h3>

              <div className="summary-card">
                <div>
                  <span>Work</span>
                  <strong>{selectedWork.name}</strong>
                </div>
                <div>
                  <span>Client</span>
                  <strong>{displayValue(form.fullName)}</strong>
                </div>
                <div>
                  <span>Business</span>
                  <strong>{displayValue(form.businessName)}</strong>
                </div>
                <div>
                  <span>Contact</span>
                  <strong>{displayValue(form.contact)}</strong>
                </div>
                <div>
                  <span>Estimate</span>
                  <strong>{formatMoney(estimatedPrice)}</strong>
                </div>
                <div>
                  <span>Deadline</span>
                  <strong>{formatDate(form.deadline)}</strong>
                </div>
                <div>
                  <span>Speed</span>
                  <strong>
                    {form.deliverySpeed === "urgent" ? "Urgent" : "Standard"}
                  </strong>
                </div>
                <div>
                  <span>Output</span>
                  <strong>{form.preferredOutput}</strong>
                </div>
                <div className="summary-card__wide">
                  <span>Content readiness</span>
                  <strong>
                    {contentModes.find((mode) => mode.id === form.contentStatus)
                      ?.title ?? "Ready"}
                  </strong>
                </div>
                <div className="summary-card__wide">
                  <span>Brief</span>
                  <strong>{displayValue(form.brief)}</strong>
                </div>
                <div className="summary-card__wide">
                  <span>Notes</span>
                  <strong>{displayValue(form.notes)}</strong>
                </div>
              </div>

              <div className="summary-note">
                <strong>Market-aware estimate</strong>
                <p>
                  This price is a starting quote for simple work. More slides,
                  more pages, heavy content help, or urgent delivery can change
                  the final amount.
                </p>
              </div>

              <div className="summary-chips">
                <span>Quick tasks</span>
                <span>Student-friendly</span>
                <span>Market aligned</span>
              </div>
            </motion.aside>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SmallWorksPage />
  </StrictMode>,
);

export default SmallWorksPage;
