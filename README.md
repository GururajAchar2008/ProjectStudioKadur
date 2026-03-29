# Project Studio

A React + Vite website for diploma and engineering CSE students to browse sample projects, select a package, and submit a request form through a submission platform such as Formspree.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Add your form endpoint in `.env`.

## Run

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## Email flow

- The form posts directly to `VITE_LEAD_ENDPOINT`.
- If you only have the Formspree form ID, set `VITE_FORMSPREE_FORM_ID` and the app will build the endpoint for you.
- This version is frontend-only, so no custom backend is needed.
# ProjectStudio
