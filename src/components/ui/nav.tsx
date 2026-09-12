import * as React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav: React.FC = () => {
  const location = useLocation();

  const jumpToComparison = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      event.preventDefault();
      document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="site-nav sticky top-0 z-50 bg-background">
      <div className="container flex h-20 items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center" aria-label="CardOnly Startseite">
          <span className="brand-mark" aria-hidden="true">/</span>
          <span className="text-2xl font-bold tracking-[-0.06em] text-foreground">cardonly</span>
          <span className="ml-0.5 self-end pb-0.5 text-xs font-medium text-muted-foreground">.de</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            to="/best"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Bestenlisten
          </Link>
          <a
            href="/topic/"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Themen
          </a>
          <a
            href="/card/"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Karten
          </a>
          <a
            href="/"
            onClick={jumpToComparison}
            className="ml-2 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-card transition-colors hover:bg-primary/90"
          >
            Vergleich starten
          </a>
        </nav>

        <a
          href="/"
          onClick={jumpToComparison}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3.5 text-sm font-semibold text-primary-foreground shadow-card sm:hidden"
        >
          Vergleich
        </a>
      </div>
    </header>
  );
};

export { Nav };
