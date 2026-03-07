import * as React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const Nav = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="container flex h-20 items-center">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-primary">CARDONLY.DE</p>
            <p className="text-xs text-slate-600">Unabhängiger Kreditkartenvergleich</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export { Nav };
