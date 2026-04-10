# Project Studio

Project Studio is a multi-page React + Vite website for three kinds of services:

- CSE final-year project builds
- Small creative works
- Professional business websites

It works like a service menu. Visitors choose a service page, compare the package options, fill a request form, and land on a confirmation page after submission.

## What This Project Includes

### Live pages

- `/` - Home page with the service menu
- `/cse-projects/` - Final-year CSE project builds
- `/smallworks/` - Fast creative and formatting work
- `/professional-projects/` - Business website packages and quote builder
- `/thankyou/` - Submission confirmation page

### Shared features

- Responsive layout for desktop and mobile
- Animated cards, hover states, and section reveals
- Theme toggle on the service pages and thank-you page
- Mobile navigation drawer
- Live request summaries so users can review what they entered
- Hosted form submission with redirect to the thank-you page
- Relative paths that keep the site GitHub Pages friendly

## Feature Breakdown

### Home page

- Presents three clear service cards so users can jump straight to the right page
- Shows preview images for each service area
- Uses motion effects and a 3D stage for a more polished first impression
- Highlights the three core directions of the business in one place

### CSE Projects

- Designed for diploma and engineering CSE students
- Shows four sample project ideas:
  - Smart Attendance Desk
  - Campus Events Portal
  - Placement Readiness Hub
  - Library Flow System
- Offers three package levels with fixed pricing
- Carries the selected package into the request form automatically
- Avoids branch selection completely, so the flow stays focused on CSE users
- Includes idea helper chips for common project directions
- Shows a live summary of the submission before it is sent

### Small Works

- Built for quick design and formatting jobs
- Covers six common small tasks:
  - PPT Making
  - Poster / Flyer
  - Social Post
  - Brochure / Menu
  - Thumbnail / Banner
  - Formatting / Cleanup
- Lets users choose content readiness and urgency level
- Supports quantity-based pricing for slides, pages, posts, or files
- Lets users choose the output format they want back
- Shows a live estimate and a live summary before submission

### Professional Projects

- Built for business websites and more polished client-style builds
- Supports four business types:
  - Consultant / CA
  - Clinic / Doctor
  - Agency / Studio
  - Restaurant / Cafe
- Supports four website goals:
  - Lead generation
  - Booking ready
  - Brand credibility
  - Sell online
- Lets users mark their content readiness
- Lets users choose standard or priority delivery
- Includes optional feature add-ons such as WhatsApp CTA, Google Maps, SEO basics, CMS/blog, booking, payments, and analytics
- Calculates the quote live as pages and add-ons change
- Includes a reference link field for inspiration or brand examples

### Thank-you page

- Confirms that the request was received
- Reassures the user that the details were captured correctly
- Explains the next steps after submission
- Gives quick links back to the main site or another request

## Pricing Structure

The pricing in Project Studio is split into three clear models.

### 1. CSE Projects pricing

CSE Projects use fixed package pricing. The user picks one package, and that choice is carried forward into the form.

| Package | Price | Best for | What is included | Timeline | Support |
| --- | --- | --- | --- | --- | --- |
| Starter | Rs. 3,400 | Simple mini projects and clean submissions | Responsive UI structure, project roadmap guidance, submission checklist | 5 to 7 days | 1 revision round |
| Builder Plus | Rs. 5,299 | Polished demos and a stronger project flow | Frontend + backend planning, database-friendly structure, presentation-ready screens | 7 to 12 days | 2 revision rounds |
| Signature Builder | Rs. 6,300 | Premium showcase projects | Luxury UI motion, deployment guidance, documentation polish | 12 to 18 days | Priority support |

Notes:

- Starter does not include documentation or a PPT.
- Builder Plus includes documentation, but not a PPT.
- Signature Builder includes documentation and a PPT for every CIE and examination, plus presentation guidance.

### 2. Small Works pricing

Small Works uses a quantity-based pricing model.

Formula:

- Final price = base price + extra units + rush fee

The base price covers a default quantity, and the price increases only if the user asks for more work or urgent delivery.

| Service | Starting price | Included quantity | Extra unit price | Rush fee | Turnaround |
| --- | --- | --- | --- | --- | --- |
| PPT Making | Rs. 699 | 10 slides | Rs. 60 per extra slide | Rs. 300 | Same day to 24 hours |
| Poster / Flyer | Rs. 599 | 1 design | Rs. 200 per extra design | Rs. 250 | Same day to 2 days |
| Social Post | Rs. 299 | 1 post | Rs. 120 per extra post | Rs. 150 | Same day |
| Brochure / Menu | Rs. 1,499 | 2 pages | Rs. 300 per extra page | Rs. 350 | 1 to 3 days |
| Thumbnail / Banner | Rs. 349 | 1 creative | Rs. 100 per extra creative | Rs. 100 | Same day |
| Formatting / Cleanup | Rs. 249 | 1 file | Rs. 50 per extra file | Rs. 100 | Within 24 hours |

Output options are also part of the flow:

- PPT Making: PPTX + PDF, PPTX only, or PDF only
- Poster / Flyer: PNG + PDF, PNG only, or PDF only
- Social Post: PNG or JPG
- Brochure / Menu: PDF or source file
- Thumbnail / Banner: PNG or source file
- Formatting / Cleanup: PDF or editable file

### 3. Professional Projects pricing

Professional Projects uses a quote builder.

Formula:

- Final price = base package + extra pages + selected add-ons + rush fee

The live quote changes as the user edits the page count, chooses features, or switches to priority delivery.

| Package | Starting rate | Included pages | Extra page price | Rush fee | Timeline |
| --- | --- | --- | --- | --- | --- |
| Business Launch | From Rs. 19,999 | 5 pages | Rs. 2,500 per extra page | Rs. 4,000 | 7 to 10 days |
| Growth Site | From Rs. 34,999 | 8 pages | Rs. 3,000 per extra page | Rs. 6,000 | 10 to 15 days |
| Signature Business | From Rs. 59,999 | 12 pages | Rs. 4,000 per extra page | Rs. 8,000 | 15 to 25 days |

Optional add-ons:

| Add-on | Price |
| --- | --- |
| WhatsApp CTA | Rs. 1,500 |
| Google Maps | Rs. 1,000 |
| SEO basics | Rs. 4,500 |
| CMS / blog | Rs. 6,500 |
| Booking system | Rs. 5,000 |
| Payments | Rs. 9,000 |
| Analytics | Rs. 2,000 |

## Form Submission Flow

- All service pages submit to a hosted form endpoint
- The current build does not need a custom backend
- Successful submissions redirect to `/thankyou/`
- Hidden form fields carry the selected package, estimate, and other form details into the request
- The same shared confirmation page is used across the site

If you later swap the form provider, update the `action` URLs in the three service pages.

## Tech Stack

- React 18
- Vite
- Framer Motion
- Hosted form submission

## Setup

### Requirements

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Optional environment file

- You can ignore `.env.example` for the current setup
- Copy it only if you plan to switch away from the current hosted form endpoint later

### Run locally

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run start
```

- `dev` starts the Vite development server
- `build` creates the production bundle
- `preview` serves the production build locally
- `start` is an alias for `preview`

## Build And Preview

### Production build

```bash
npm run build
```

### Preview the build

```bash
npm run preview
```

## GitHub Pages Deployment

This project is already configured for GitHub Pages using relative paths.

1. Push the repository to GitHub.
2. Open the repository settings.
3. Go to `Pages`.
4. Set the source to `GitHub Actions`.
5. Wait for `.github/workflows/deploy.yml` to finish.
6. Open the GitHub Pages URL.
7. If the site still shows old content, do a hard refresh.

## Project Structure

- `src/App.jsx` - Home page with the service menu
- `src/cseprojects.jsx` - CSE project packages and request form
- `src/smallworks.jsx` - Small creative work packages and request form
- `src/professionalprojects.jsx` - Business website packages and quote builder
- `src/thankyou.jsx` - Submission confirmation page
- `public/project-previews/` - Preview images used across the site

