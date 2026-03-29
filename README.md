# Project Studio

A React + Vite website for diploma and engineering CSE students to browse sample projects, choose a package, and submit a request through a platform like Formspree.

## What You Need

- Node.js 18 or newer
- A GitHub repository
- A form endpoint from Formspree or another compatible service

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Add your form endpoint in `.env`:

```bash
VITE_LEAD_ENDPOINT=https://formspree.io/f/your_form_id
```

4. Start the local dev server:

```bash
npm run dev
```

## Build And Preview

1. Create the production build:

```bash
npm run build
```

2. Preview the production build locally:

```bash
npm run preview
```

## GitHub Pages Deployment

The project is set up to work with GitHub Pages without changing the Vite base path for each repository.

1. Push the code to GitHub.
2. In your repository settings, open `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Wait for the workflow in `.github/workflows/deploy.yml` to finish.
5. Open the Pages URL shown by GitHub.
6. Hard refresh the browser if you still see old content.

## Form Submission

- The form posts directly to `VITE_LEAD_ENDPOINT`.
- If you only have the Formspree form ID, set `VITE_FORMSPREE_FORM_ID` and the app will build the endpoint automatically.
- This version is frontend-only, so no custom backend is needed.

## If The Page Looks Blank

1. Check that the GitHub Actions deploy succeeded.
2. Make sure Pages is set to `GitHub Actions`, not `Deploy from a branch`.
3. Open DevTools and check for a missing `assets/index-*.js` file.
4. Confirm the repository was pushed after the latest code changes.
5. If you see `GET /src/main.jsx 404`, GitHub Pages is still serving the source `index.html` instead of the built `dist` site.
# ProjectStudio
