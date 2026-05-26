import { AnimatePresence, motion } from "framer-motion";
import { StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const projectLogo = "../favicon.svg";

const businessTypes = [
  {
    id: "consultant",
    title: "Consultant / CA",
    copy: "Clean trust-first pages for professionals who need credibility and leads.",
  },
  {
    id: "clinic",
    title: "Clinic / Doctor",
    copy: "Appointment-ready websites with service pages, maps, and contact flow.",
  },
  {
    id: "agency",
    title: "Agency / Studio",
    copy: "Showcase your services, proof of work, and stronger lead capture.",
  },
  {
    id: "hospitality",
    title: "Restaurant / Cafe",
    copy: "Menu, gallery, booking, and location details that help people decide quickly.",
  },
];

const websiteGoals = [
  {
    id: "lead_gen",
    title: "Lead generation",
    copy: "Turn visitors into calls, WhatsApp chats, and enquiry forms.",
  },
  {
    id: "booking",
    title: "Booking ready",
    copy: "Let people book consultations, visits, or services directly.",
  },
  {
    id: "brand",
    title: "Brand credibility",
    copy: "Make the business look established, clear, and easy to trust.",
  },
  {
    id: "sales",
    title: "Sell online",
    copy: "Support products, packages, deposits, or payment flows.",
  },
];

const contentModes = [
  {
    id: "ready",
    title: "Content ready",
    copy: "You already have the copy, images, and service list.",
  },
  {
    id: "needs_help",
    title: "Need copy help",
    copy: "You need help shaping the service copy and page flow.",
  },
  {
    id: "strategy",
    title: "Need strategy",
    copy: "You want help planning the website from the ground up.",
  },
];

const speedModes = [
  {
    id: "standard",
    title: "Standard",
    copy: "Balanced turnaround with the best value.",
  },
  {
    id: "priority",
    title: "Priority",
    copy: "Faster delivery with a rush fee added.",
  },
];

const featureOptions = [
  { id: "whatsapp", label: "WhatsApp CTA", price: 1500 },
  { id: "maps", label: "Google Maps", price: 1000 },
  { id: "seo", label: "SEO basics", price: 4500 },
  { id: "cms", label: "CMS / blog", price: 6500 },
  { id: "booking", label: "Booking system", price: 5000 },
  { id: "payments", label: "Payments", price: 9000 },
  { id: "analytics", label: "Analytics", price: 2000 },
];

const professionalPackages = [
  {
    id: "launch",
    name: "Business Launch",
    priceLabel: "From Rs. 19,999",
    badge: "Fast launch",
    summary:
      "A clean website for local businesses and professionals who need a solid first online presence.",
    description:
      "Best for 4 to 5 pages with contact, services, trust sections, and mobile-first polish.",
    timeline: "7 to 10 days",
    support: "1 revision round",
    pageLabel: "Pages",
    defaultPages: 5,
    pageHint: "Base price includes up to 5 pages.",
    basePrice: 19999,
    includedPages: 5,
    extraPagePrice: 2500,
    rushFee: 4000,
    bullets: [
      "Responsive website structure",
      "Enquiry form and WhatsApp CTA",
      "Google Maps and service pages",
    ],
    tone: "#2563eb",
  },
  {
    id: "growth",
    name: "Growth Site",
    priceLabel: "From Rs. 34,999",
    badge: "Most chosen",
    summary:
      "For businesses that need more pages, easier content updates, and a stronger lead flow.",
    description:
      "Ideal for service brands that want a CMS-ready site with SEO foundations and extra sections.",
    timeline: "10 to 15 days",
    support: "2 revision rounds",
    pageLabel: "Pages",
    defaultPages: 8,
    pageHint: "Base price includes up to 8 pages.",
    basePrice: 34999,
    includedPages: 8,
    extraPagePrice: 3000,
    rushFee: 6000,
    bullets: [
      "CMS-ready content blocks",
      "SEO-friendly structure",
      "Analytics and stronger lead capture",
    ],
    tone: "#0f766e",
  },
  {
    id: "signature",
    name: "Signature Business",
    priceLabel: "From Rs. 59,999",
    badge: "Premium finish",
    summary:
      "Custom business websites with booking, integrations, and a polished premium presentation.",
    description:
      "Built for brands that need custom UI, advanced functionality, and a more premium launch experience.",
    timeline: "15 to 25 days",
    support: "Priority support",
    pageLabel: "Pages",
    defaultPages: 12,
    pageHint: "Base price includes up to 12 pages.",
    basePrice: 59999,
    includedPages: 12,
    extraPagePrice: 4000,
    rushFee: 8000,
    bullets: [
      "Custom UI and motion",
      "Booking or payment integrations",
      "Advanced SEO and deployment support",
    ],
    tone: "#475569",
  },
];

const processSteps = [
  {
    title: "Pick a package",
    copy: "Choose the website build level that matches your launch plan and business size.",
  },
  {
    title: "Share the business",
    copy: "Tell us what the company does, who the customers are, and what should be on the site.",
  },
  {
    title: "Approve and launch",
    copy: "We build, review, refine, and get the website ready for real customers to visit.",
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

function resolveSmallWorksUrl() {
  if (typeof window === "undefined") {
    return "/smallworks/";
  }

  return new URL("../smallworks/", window.location.href).href;
}

function resolveThankYouUrl() {
  if (typeof window === "undefined") {
    return "/thankyou/";
  }

  return new URL("../thankyou/", window.location.href).href;
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

function BusinessPackageCard({ packageItem, active, onSelect }) {
  return (
    <motion.button
      type="button"
      className={`package-card ${active ? "package-card--active" : ""}`}
      variants={itemVariants}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(packageItem.id)}
      aria-pressed={active}
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
          {active ? (
            <span className="package-card__selected">Selected</span>
          ) : null}
        </div>
        <div className="package-card__price">
          <span>Starting rate</span>
          <strong>{packageItem.priceLabel}</strong>
        </div>
      </div>
      <h3>{packageItem.name}</h3>
      <p>{packageItem.summary}</p>
      <p className="package-card__description">{packageItem.description}</p>
      <ul>
        {packageItem.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="package-card__footer">
        <span>
          <small>Turnaround</small>
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

function getBriefPlaceholder(businessType) {
  switch (businessType) {
    case "clinic":
      return "Services, booking flow, location, and any trust points you want highlighted.";
    case "restaurant":
      return "Menu structure, gallery notes, reservation flow, and what should stand out.";
    case "agency":
      return "Services, case studies, brand tone, and the action you want from visitors.";
    case "consultant":
      return "Your services, target clients, and the message you want the website to send.";
    default:
      return "Tell us the business goal, pages needed, and any reference sites or notes.";
  }
}

function estimatePrice(packageItem, form) {
  const pageCount = Math.max(
    1,
    Number.parseInt(form.pageCount, 10) || packageItem.defaultPages,
  );
  const extraPages = Math.max(0, pageCount - packageItem.includedPages);
  const extraFeatures = featureOptions.reduce((sum, feature) => {
    return form.selectedFeatures.includes(feature.id)
      ? sum + feature.price
      : sum;
  }, 0);
  const rushFee = form.deliverySpeed === "priority" ? packageItem.rushFee : 0;

  return (
    packageItem.basePrice +
    extraPages * packageItem.extraPagePrice +
    extraFeatures +
    rushFee
  );
}

function formDefaults(packageItem) {
  return {
    fullName: "",
    businessName: "",
    contact: "",
    deadline: "",
    pageCount: String(packageItem.defaultPages),
    businessType: businessTypes[0].id,
    websiteGoal: websiteGoals[0].id,
    deliverySpeed: "standard",
    contentStatus: "ready",
    selectedFeatures: ["whatsapp", "maps"],
    referenceLink: "",
    brief: "",
    notes: "",
  };
}

function ProfessionalProjectsPage() {
  const [theme, setTheme] = useState(resolveInitialTheme);
  const [selectedPackageId, setSelectedPackageId] = useState("launch");
  const [form, setForm] = useState(() => formDefaults(professionalPackages[0]));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const homeUrl = resolveHomeUrl();
  const smallWorksUrl = resolveSmallWorksUrl();
  const thankYouUrl = resolveThankYouUrl();
  const selectedPackage =
    professionalPackages.find((item) => item.id === selectedPackageId) ??
    professionalPackages[0];
  const estimatedPrice = estimatePrice(selectedPackage, form);
  const headerItems = [
    {
      id: "project-builds",
      label: "Project builds",
      type: "link",
      href: homeUrl,
    },
    {
      id: "small-works",
      label: "Small works",
      type: "link",
      href: smallWorksUrl,
    },
    { id: "packages", label: "Packages", type: "section" },
    { id: "process", label: "Process", type: "section" },
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
    document.title = "Professional Projects | Project Studio";
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
      pageCount: String(selectedPackage.defaultPages),
    }));
  }, [selectedPackage.id]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleFeature(featureId) {
    setForm((current) => {
      const selected = current.selectedFeatures.includes(featureId)
        ? current.selectedFeatures.filter((id) => id !== featureId)
        : [...current.selectedFeatures, featureId];

      return {
        ...current,
        selectedFeatures: selected,
      };
    });
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
            <small>Professional projects</small>
          </span>
        </a>

        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? "menu-toggle--open" : ""}`}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="professional-projects-menu"
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
              id="professional-projects-menu"
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
                aria-label="Professional projects primary"
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
                  The business links and theme switch now live in the drawer so
                  the top bar stays minimal on every screen.
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
              Professional websites for business owners
            </span>
            <h1>Book a polished website build for your business.</h1>
            <p className="hero-text">
              This page is for consultants, clinics, agencies, restaurants, and
              growing local brands that need a professional website with trust,
              lead generation, and a clean customer journey.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="button button-primary"
                onClick={() => scrollToSection("packages")}
              >
                Browse packages
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => scrollToSection("request")}
              >
                Start booking
              </button>
            </div>
            <div className="hero-stats">
              <div>
                <strong>Rs. 19,999</strong>
                <span>Launch start</span>
              </div>
              <div>
                <strong>Rs. 34,999</strong>
                <span>Growth start</span>
              </div>
              <div>
                <strong>Rs. 59,999</strong>
                <span>Signature start</span>
              </div>
            </div>
            <div className="hero-notes">
              <span className="note-chip">Lead-focused</span>
              <span className="note-chip">Business-ready</span>
              <span className="note-chip">Market-aware pricing</span>
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
                <span className="hero-visual__badge">
                  {selectedPackage.badge}
                </span>
              </div>
              <h2>{selectedPackage.name}</h2>
              <div className="hero-visual__price">
                <span>Starting rate</span>
                <strong>{selectedPackage.priceLabel}</strong>
              </div>
              <p>{selectedPackage.summary}</p>

              <div className="feature-list">
                {selectedPackage.bullets.map((bullet) => (
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
                  <span>Timeline</span>
                  <strong>{selectedPackage.timeline}</strong>
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
            eyebrow="Why it works"
            title="A cleaner, business-first website flow."
            copy="The site is designed to make the business look trustworthy, explain the offer clearly, and turn interest into a direct enquiry."
          />

          <motion.div className="trust-grid" variants={listVariants}>
            {[
              {
                title: "Lead-ready structure",
                copy: "Contact forms, WhatsApp, and strong calls to action stay easy to find.",
              },
              {
                title: "Professional credibility",
                copy: "Calm layouts and clear hierarchy help the business feel established.",
              },
              {
                title: "Scalable from day one",
                copy: "The site can grow into a blog, booking system, or CMS later.",
              },
              {
                title: "Simple handoff",
                copy: "We keep the booking and review flow easy so business owners can move quickly.",
              },
            ].map((feature) => (
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
          id="packages"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={sectionVariants}
        >
          <SectionHeading
            eyebrow="Packages"
            title="Choose the build level, then let the form carry the details forward."
            copy="The pricing starts in line with current Indian small-business and professional website ranges, and can move with page count, features, and urgency."
          />

          <motion.div className="package-grid" variants={listVariants}>
            {professionalPackages.map((packageItem) => (
              <BusinessPackageCard
                key={packageItem.id}
                packageItem={packageItem}
                active={selectedPackageId === packageItem.id}
                onSelect={setSelectedPackageId}
              />
            ))}
          </motion.div>

          <p className="section-footnote">
            Starting rates are based on common Indian business website pricing
            patterns. Features like CMS, booking, SEO setup, and payments can
            change the final quote.
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
            title="Three simple steps from brief to launch."
            copy="Pick a package, share the business details, and we shape the website around what the brand actually needs."
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
            eyebrow="Booking form"
            title="Tell us what your business needs and we will shape the quote."
            copy="This form is tuned for professional websites: business details, goals, pages, features, and the deadline all in one place."
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
                  <h3>Tell us about the business website.</h3>
                </div>

                <div className="selected-package-card">
                  <span>Selected package</span>
                  <strong>{selectedPackage.name}</strong>
                  <small>{selectedPackage.priceLabel}</small>
                </div>
              </div>

              <input
                type="hidden"
                name="subject"
                value={`Project Studio professional project - ${selectedPackage.name}`}
              />
              <input
                type="hidden"
                name="selectedPackageId"
                value={selectedPackageId}
              />
              <input
                type="hidden"
                name="selectedPackageName"
                value={selectedPackage.name}
              />
              <input
                type="hidden"
                name="selectedPackagePriceLabel"
                value={selectedPackage.priceLabel}
              />
              <input
                type="hidden"
                name="selectedPackageEstimatedPrice"
                value={formatMoney(estimatedPrice)}
              />
              <input
                type="hidden"
                name="selectedPackagePages"
                value={form.pageCount}
              />
              <input
                type="hidden"
                name="selectedBusinessType"
                value={form.businessType}
              />
              <input
                type="hidden"
                name="selectedGoal"
                value={form.websiteGoal}
              />
              <input
                type="hidden"
                name="selectedFeatures"
                value={form.selectedFeatures.join(", ")}
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
                  <span>Business name</span>
                  <input
                    type="text"
                    name="businessName"
                    value={form.businessName}
                    onChange={(event) =>
                      updateField("businessName", event.target.value)
                    }
                    placeholder="Brand or company name"
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
                  <span>{selectedPackage.pageLabel}</span>
                  <input
                    type="number"
                    name="pageCount"
                    min="1"
                    step="1"
                    value={form.pageCount}
                    onChange={(event) =>
                      updateField("pageCount", event.target.value)
                    }
                    required
                  />
                </label>

                <div className="field">
                  <span>Page note</span>
                  <div className="summary-note">
                    <p>{selectedPackage.pageHint}</p>
                  </div>
                </div>
              </div>

              <fieldset className="idea-mode">
                <legend>Business type</legend>
                <div className="radio-grid">
                  {businessTypes.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      className={`radio-card ${form.businessType === mode.id ? "radio-card--active" : ""}`}
                      onClick={() => updateField("businessType", mode.id)}
                    >
                      <strong>{mode.title}</strong>
                      <span>{mode.copy}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="idea-mode">
                <legend>Website goal</legend>
                <div className="radio-grid">
                  {websiteGoals.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      className={`radio-card ${form.websiteGoal === mode.id ? "radio-card--active" : ""}`}
                      onClick={() => updateField("websiteGoal", mode.id)}
                    >
                      <strong>{mode.title}</strong>
                      <span>{mode.copy}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

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
                  <span>Optional features</span>
                  <span className="idea-helper">
                    Select the add-ons the business website should include.
                  </span>
                </div>

                <div className="idea-chips" aria-label="Feature options">
                  {featureOptions.map((feature) => (
                    <button
                      type="button"
                      key={feature.id}
                      className={`idea-chip ${form.selectedFeatures.includes(feature.id) ? "idea-chip--active" : ""}`}
                      onClick={() => toggleFeature(feature.id)}
                    >
                      {feature.label}
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
                    placeholder={getBriefPlaceholder(form.businessType)}
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
                  placeholder="Add brand notes, launch details, or any special instructions."
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
                  placeholder="Paste a reference website or brand link"
                />
              </label>

              <div className="form-actions">
                <button
                  type="submit"
                  className="button button-primary button-submit"
                >
                  Book professional website build
                </button>
                <p className="form-note">
                  This request goes to the same inbox and then redirects to the
                  shared thank-you page after submission.
                </p>
              </div>

              <p className="privacy-note">
                Built for business owners who want a cleaner, stronger website
                that feels professional from the first visit.
              </p>
            </motion.form>

            <motion.aside className="request-summary" variants={itemVariants}>
              <p className="form-label">Live summary</p>
              <h3>What the submission will contain</h3>

              <div className="summary-card">
                <div>
                  <span>Package</span>
                  <strong>{selectedPackage.name}</strong>
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
                  <span>Business type</span>
                  <strong>
                    {businessTypes.find((mode) => mode.id === form.businessType)
                      ?.title ?? "Selected"}
                  </strong>
                </div>
                <div>
                  <span>Goal</span>
                  <strong>
                    {websiteGoals.find((mode) => mode.id === form.websiteGoal)
                      ?.title ?? "Selected"}
                  </strong>
                </div>
                <div className="summary-card__wide">
                  <span>Content readiness</span>
                  <strong>
                    {contentModes.find((mode) => mode.id === form.contentStatus)
                      ?.title ?? "Ready"}
                  </strong>
                </div>
                <div className="summary-card__wide">
                  <span>Features</span>
                  <strong>
                    {form.selectedFeatures.length > 0
                      ? form.selectedFeatures
                          .map(
                            (featureId) =>
                              featureOptions.find(
                                (feature) => feature.id === featureId,
                              )?.label,
                          )
                          .filter(Boolean)
                          .join(", ")
                      : "None selected"}
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
                  These are starting quotes based on current Indian business
                  website ranges. More pages, booking or payment systems, CMS
                  setup, and urgent delivery can change the final amount.
                </p>
              </div>

              <div className="summary-chips">
                <span>Business-ready</span>
                <span>Lead-focused</span>
                <span>Professional polish</span>
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
    <ProfessionalProjectsPage />
  </StrictMode>,
);

export default ProfessionalProjectsPage;
