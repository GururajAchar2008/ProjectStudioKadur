import { motion } from 'framer-motion';
import { useEffect } from 'react';
import './styles.css';

const projectLogo = '../favicon.svg';

const receiptCards = [
  {
    title: 'Package captured',
    copy: 'Your selected build level and timeline were sent with the request.',
  },
  {
    title: 'Idea recorded',
    copy: 'The project direction, feature notes, and extra details are ready for review.',
  },
  {
    title: 'Contact ready',
    copy: 'We can follow up using the contact information you shared in the form.',
  },
];

const nextSteps = [
  'We review the package choice and submission details.',
  'We check the project scope against your deadline and notes.',
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

function ThankYouPage() {
  const theme = resolveInitialTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    try {
      window.localStorage.setItem('project-studio-theme', theme);
    } catch (error) {
      // Ignore storage failures and keep the page usable.
    }
  }, [theme]);

  useEffect(() => {
    document.title = 'Thank you | Project Studio';
  }, []);

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
      </header>

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
              We’ve received the package, timeline, contact details, and idea
              notes. We’ll review everything and follow up from here.
            </p>

            <div className="summary-chips" aria-label="Submission summary">
              <span>Inbox confirmed</span>
              <span>Package carried forward</span>
              <span>No branch selector</span>
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

export default ThankYouPage;
