# Project Studio

A React + Vite website for diploma and engineering CSE students to browse sample projects, choose a package, and submit a request through Web3Forms.

## What You Need

- Node.js 18 or newer
- A GitHub repository
- A form endpoint from Web3Forms or another compatible service

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Optional: copy the example env file only if you plan to switch back to env-driven submission later:

```bash
cp .env.example .env
```

3. Start the local dev server:

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

- The form posts directly to the hardcoded Web3Forms action in `src/App.jsx`.
- Successful submissions redirect to `/thankyou/`.
- You do not need an `.env` file for the current form setup.
- This version is frontend-only, so no custom backend is needed.

## If The Page Looks Blank

1. Check that the GitHub Actions deploy succeeded.
2. Make sure Pages is set to `GitHub Actions`, not `Deploy from a branch`.
3. Open DevTools and check for a missing `assets/index-*.js` file.
4. Confirm the repository was pushed after the latest code changes.
5. If you see `GET /src/main.jsx 404`, GitHub Pages is still serving the source `index.html` instead of the built `dist` site.
# ProjectStudio
