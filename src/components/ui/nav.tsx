import * as React from "react";
import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-base font-extrabold tracking-tight text-foreground">CardOnly</span>
          <span className="text-base font-extrabold tracking-tight text-foreground/30">.de</span>
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <Link
            to="/best"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Bestenlisten
          </Link>
          <a
            href="/topic/"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Themen
          </a>
          <a
            href="/card/"
            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Karten
          </a>
        </nav>
      </div>
    </header>
  );
};

export { Nav };
