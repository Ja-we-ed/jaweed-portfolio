# Jaweed — Portfolio

Personal portfolio for Jaweed, a computer science student in Dhaka — a single-page site with a dark cyan glass interface.

## Tech stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide](https://lucide.dev/) icons
- [simple-icons](https://simpleicons.org/) for toolkit marks

## Features

- Glass UI: a frosted navigation bar that fills in on scroll, glass cards, and a cyan grid glow behind the hero
- Scroll-linked motion that plays in as a section enters and reverses if you scroll back up
- Infinite project reel that drifts on its own, pauses on hover, and can be dragged or stepped with arrows; category filters narrow the cards
- Infinite toolkit marquee (two directions, paused on hover) that falls back to a static grid when reduced motion is on
- Kinetic hero wordmark and magnetic call-to-action buttons
- Launch circuit (Idea → Design → Build → Ship → Grow) whose active step follows the scroll position
- Filterable skill inventory with honest levels — Building with, Comfortable, Learning — instead of percentage bars
- AI section with a scroll-drawn graph and a terminal line that types in as it enters the viewport
- Career documentary and an education timeline
- Contact block wired to the email and social links in `src/content.ts`
- Reduced-motion support, a skip-to-content link, and visible keyboard focus
- Open Graph tags, `robots.txt`, and a static 404 page that sends visitors home

All copy, metrics, skills, projects, and links live in `src/content.ts`.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # typecheck and production build
npm run preview  # serve the production build
npm run lint     # oxlint
```

`scripts/scroll-pop-test.mjs` is a local Playwright check for the scroll reveals. It expects a preview server and is not part of `npm run build`.

## Project structure

```
.
├── index.html              # document shell, meta, and JSON-LD
├── vite.config.ts
├── package.json
├── public/
│   ├── og.png              # Open Graph image
│   ├── favicon.svg
│   ├── robots.txt
│   ├── 404.html
│   ├── circuit/            # launch-circuit photos + CREDITS.md
│   └── projects/           # project-card photos + CREDITS.md
├── scripts/
│   └── scroll-pop-test.mjs
└── src/
    ├── main.tsx
    ├── App.tsx             # section order and hash handling
    ├── content.ts          # copy, projects, skills, and links
    ├── index.css           # Tailwind theme, glass, and motion
    ├── motion.ts           # shared motion variants
    ├── useRewindPop.ts     # scroll-linked reveal
    └── components/         # Nav, Hero, About, AI, circuit, skills, reel, story, contact
```

## Image credits

Photographs in the project reel and the launch circuit are stock images, not photos of Jaweed. Credits, sources, and licenses:

- [`public/projects/CREDITS.md`](public/projects/CREDITS.md)
- [`public/circuit/CREDITS.md`](public/circuit/CREDITS.md)
