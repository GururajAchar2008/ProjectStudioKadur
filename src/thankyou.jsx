import { AnimatePresence, motion } from 'framer-motion';
import { StrictMode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const projectLogo = '../favicon.svg';

const receiptCards = [
  {
    title: 'Details captured',
    copy: 'Your selected service, timeline, and contact details were sent with the request.',
  },
  {
    title: 'Brief recorded',
    copy: 'The project direction, feature notes, and extra details are ready for review.',
  },
  {
    title: 'Contact ready',
    copy: 'We can follow up using the contact information you shared in the form.',
  },
];

const nextSteps = [
  'We review the selected service and submission details.',
  'We check the scope against your deadline and notes.',
  'We reach back out using the contact details you entered.',
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
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
    return 'light';
  }

  try {
    const stored = window.localStorage.getItem('project-studio-theme');

    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch (error) {
    // Some browsers block localStorage in private or hardened modes.
  }

  return 'light';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const themeColor = document.querySelector('meta[name="theme-color"]');

  if (themeColor) {
    themeColor.setAttribute('content', theme === 'dark' ? '#030303' : '#fafafa');
  }
}

function ThankYouPage() {
  const [theme, setTheme] = useState(resolveInitialTheme());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { id: 'home', label: 'Project builds', href: '../' },
    { id: 'request', label: 'Submit another request', href: '../#request' },
    { id: 'smallworks', label: 'Small works', href: '../smallworks/' },
    { id: 'professional-projects', label: 'Professional projects', href: '../professional-projects/' },
  ];

  useEffect(() => {
    applyTheme(theme);

    try {
      window.localStorage.setItem('project-studio-theme', theme);
    } catch (error) {
      // Ignore storage failures and keep the page usable.
    }
  }, [theme]);

  useEffect(() => {
    document.title = 'Thank you | Project Studio';
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? 'hidden' : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="ambient ambient-c" />

      <header className="thankyou-topbar">
        <a className="brand" href="../">
          <img className="brand-mark" src={projectLogo} alt="" aria-hidden="true" />
          <span className="brand-copy">
            <strong>Project Studio</strong>
            <small>CSE final-year builds</small>
          </span>
        </a>

        <span className="note-chip">Submission received</span>

        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? "menu-toggle--open" : ""}`}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="thankyou-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <button
              type="button"
              className="mobile-menu__backdrop"
              aria-label="Close navigation menu"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.aside
              id="thankyou-menu"
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

              <nav className="mobile-menu__nav" aria-label="Thank you page primary">
                {menuItems.map((item) => (
                  <a
                    key={item.id}
                    className="mobile-menu__link"
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mobile-menu__section">
                <span className="mobile-menu__eyebrow">Theme</span>
                <button
                  type="button"
                  className="theme-toggle"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                  onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                >
                  <span className="theme-toggle__label">Light</span>
                  <span className="theme-toggle__track">
                    <span className={`theme-toggle__thumb theme-toggle__thumb--${theme}`} />
                  </span>
                  <span className="theme-toggle__label">Dark</span>
                </button>
              </div>

              <div className="mobile-menu__section mobile-menu__section--note">
                <span className="mobile-menu__eyebrow">Quick note</span>
                <p>Use the drawer to jump back to the main site or switch the look without leaving this page.</p>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="thankyou-main">
        <motion.section
          className="panel thankyou-panel"
          initial="hidden"
          animate="show"
          variants={sectionVariants}
        >
          <div className="thankyou-copy">
            <span className="eyebrow eyebrow--hero">Web3Forms handoff complete</span>
            <h1>Thanks. Your request is in.</h1>
            <p>
              We’ve received the service, timeline, contact details, and idea
              notes. We’ll review everything and follow up from here.
            </p>

            <div className="summary-chips" aria-label="Submission summary">
              <span>Inbox confirmed</span>
              <span>Details carried forward</span>
              <span>Fast response route</span>
            </div>

            <div className="thankyou-actions">
              <a className="button button-primary" href="../">
                Back to home
              </a>
              <a className="button button-secondary" href="../#request">
                Submit another request
              </a>
            </div>
          </div>

          <div className="thankyou-side">
            <motion.div className="thankyou-stack" variants={listVariants}>
              {receiptCards.map((card) => (
                <motion.article className="thankyou-receipt" key={card.title} variants={itemVariants}>
                  <span>{card.title}</span>
                  <p>{card.copy}</p>
                </motion.article>
              ))}
            </motion.div>

            <div className="summary-note thankyou-note">
              <strong>What happens next</strong>
              <ul>
                {nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThankYouPage />
  </StrictMode>,
);

export default ThankYouPage;
