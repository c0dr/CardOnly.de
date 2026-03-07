import React, { Component } from 'react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { ShieldCheck, Info } from 'lucide-react';
import CardCard from './CardCard';

class CardComponents extends Component {
  render() {
    const { cards, cols, comparedIssuers, onToggleCompare } = this.props;

    return (
      <section className="animate-fade-up" style={{ animationDelay: '120ms' }}>
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">{cards.length} Karten im Vergleich</h2>
                <div className="group relative">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-600">
                    i
                  </span>
                  <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-80 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 shadow-xl group-hover:block">
                    Bei Geldabhebungen gilt: Betreiber von Geldautomaten können eigene Gebühren erheben, die die
                    Kartenausgeber nicht erstatten.
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600">Direkter Konditionsvergleich inklusive Anbieter-Links.</p>
            </div>
            <span className="hero-pill">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Transparenter Vergleich
            </span>
          </div>

          <Alert className="mt-4 border-amber-200 bg-amber-50 text-amber-900">
            <Info className="h-4 w-4 text-amber-700" />
            <AlertDescription className="text-sm text-amber-900">
              Bei markierten Partnerlinks erhalten wir ggf. eine Provision. Das beeinflusst die Reihenfolge im
              Vergleich nicht.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-4">
          {cards.map((card, index) => (
            <CardCard
              key={`${card.Issuer}-${index}`}
              card={card}
              cols={cols}
              index={index}
              onToggleCompare={onToggleCompare}
              isCompared={comparedIssuers.includes(card.Issuer)}
              compareDisabled={!comparedIssuers.includes(card.Issuer) && comparedIssuers.length >= 3}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default CardComponents;
