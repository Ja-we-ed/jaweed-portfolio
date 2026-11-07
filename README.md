# Jaweed — Portfolio

Personal portfolio of **Jaweed**, a computer science student in Dhaka.

**Live:** https://ja-we-ed.github.io/jaweed-portfolio/

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

```bash
npm run build     # typecheck and production build (base /jaweed-portfolio/)
npm run preview   # http://localhost:4173/jaweed-portfolio/
npm run lint
```

Copy, projects, and links live in `src/content.ts`. Photos are in `public/`.

Stack: React, Vite, TypeScript, Tailwind CSS v4, Framer Motion.

Pushes to `main` build and deploy with GitHub Actions. Pages must use **GitHub Actions** as the source (Settings → Pages).
