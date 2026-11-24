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
    <header className="site-nav sticky top-0 z-50">
      <div className="container flex h-[72px] items-center justify-between gap-4 px-4">
        <Link to="/" className="brand-lockup" aria-label="CardOnly Startseite">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="brand-wordmark">cardonly<span>.de</span></span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            to="/best"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Karten nach Kriterien
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
            className="nav-cta ml-3 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all"
          >
            Vergleich starten
          </a>
        </nav>

        <a
          href="/"
          onClick={jumpToComparison}
          className="nav-cta inline-flex h-10 items-center justify-center rounded-lg bg-primary px-3.5 text-sm font-semibold text-primary-foreground sm:hidden"
        >
          Vergleich
        </a>
      </div>
    </header>
  );
};

export { Nav };
