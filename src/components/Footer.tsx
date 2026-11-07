import { site } from '../content'

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 sm:flex-row sm:items-center sm:px-6">
        <p className="font-mono text-[12px] text-muted">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-muted">
          <p>Built with React · Vite · Tailwind · Framer Motion</p>
          <a href="#top" className="-my-3 inline-flex min-h-11 items-center py-3 text-muted transition hover:text-primary">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
