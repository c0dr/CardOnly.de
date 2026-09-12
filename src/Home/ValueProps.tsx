import React from 'react';
import { Eye, ShieldCheck, RefreshCw, GitCompareArrows, type LucideIcon } from 'lucide-react';

interface ValueProp {
  icon: LucideIcon;
  title: string;
  text: string;
}

const props: ValueProp[] = [
  {
    icon: ShieldCheck,
    title: '100 % unabhängig',
    text: 'Keine bezahlten Platzierungen. Die Reihenfolge entsteht durch Bewertung – nicht durch Provision.',
  },
  {
    icon: Eye,
    title: 'Keine versteckten Kosten',
    text: 'Jahresgebühr, ATM-Gebühren, Fremdwährungszuschlag. Wir zeigen die Kosten, die andere verschweigen.',
  },
  {
    icon: GitCompareArrows,
    title: 'Direkt vergleichbar',
    text: 'Bis zu 3 Karten Kondition für Kondition gegenüberstellen – in einer Tabelle, ohne Kleingedrucktes.',
  },
  {
    icon: RefreshCw,
    title: 'Immer aktuell',
    text: 'Konditionen werden fortlaufend geprüft und aktualisiert – auch bei Gebührenänderungen.',
  },
];

const ValueProps: React.FC = () => {
  return (
    <section className="pb-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {props.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lift"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 transition-colors group-hover:bg-accent group-hover:text-white text-accent">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <h3 className="mt-3.5 text-[15px] font-semibold tracking-tight text-foreground">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProps;
