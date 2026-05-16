# Shotfolio

Shotfolio is a premium portfolio cover generator for developers. Upload a website screenshot, choose a refined cover style, sync the visual palette from the screenshot, preview the composition live, and export a high-quality PNG for your portfolio, README, LinkedIn, Behance, or Dribbble.

## Features

- Screenshot upload with instant live preview
- Automatic color palette extraction from uploaded screenshots
- Premium browser, floating card, minimal, and MacBook-style mockups
- Export presets for portfolio covers, GitHub README images, LinkedIn squares, Behance covers, and Dribbble shots
- Responsive landing page and generator experience
- High-quality PNG export with `html-to-image`
- Temporary editor data stored in React state and `localStorage`
- No database, no authentication, and no paid external APIs

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- Framer Motion
- Lucide React
- html-to-image

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Project Structure

```txt
src/app
  page.tsx
  generator/page.tsx
src/components
  navbar.tsx
  hero.tsx
  features.tsx
  template-gallery.tsx
  generator/*
  ui/*
src/lib
  constants.ts
  export-image.ts
  extract-colors.ts
  templates.ts
src/types
  index.ts
```

## Deployment

Shotfolio is built with Next.js and is ready to deploy on Vercel.

Created for developers who care about presentation.
