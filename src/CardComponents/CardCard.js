import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableRow, TableCell } from '../components/ui/table';
import FeeLabel from './FeeLabel';
import { Check, Info, X } from 'lucide-react';

const chargeLabels = {
  charge: 'Charge',
  credit: 'Credit',
  debit: 'Debit',
  prepaid: 'Prepaid',
};

const formatForeignFee = (value) => {
  if (value === 0) return '0%';
  if (value === undefined || value === null || value === '' || value === 'null') return 'Nicht angegeben';
  return value;
};

const formatAtmFeeValue = (value) => {
  if (value === 0) return '0';
  if (value === undefined || value === null || value === '' || value === 'null') return 'n/a';
  return String(value);
};

const CardCard = ({ card, cols, index, onToggleCompare, isCompared, compareDisabled }) => {
  const [activeTab, setActiveTab] = useState('pricing');
  const nonAffiliateLink = card.link || null;
  const showProminentLegalText = card.Issuer?.toLowerCase().includes('hanseatic');

  const featureBadges = useMemo(
    () => [
      { label: 'Apple Pay', enabled: card.applepay },
      { label: 'Google Pay', enabled: card.googlepay },
      { label: 'NFC', enabled: card.contactless },
      { label: 'Offline-PIN', enabled: card.offlinepin },
    ],
    [card.applepay, card.googlepay, card.contactless, card.offlinepin]
  );

  const atmLabel = useMemo(() => {
    if (card.fees_atm_foreign === 0) return card.cashAdvanceImmediate ? 'Weltweit kostenlos*' : 'Weltweit kostenlos';
    if (card.fees_atm_eur === 0) return card.cashAdvanceImmediate ? 'Im Euroraum kostenlos*' : 'Im Euroraum kostenlos';
    return `EUR: ${formatAtmFeeValue(card.fees_atm_eur)} • Ausland: ${formatAtmFeeValue(card.fees_atm_foreign)}`;
  }, [card.fees_atm_eur, card.fees_atm_foreign, card.cashAdvanceImmediate]);

  const renderBooleanPill = (value) => {
    if (value === true) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
          <Check className="h-3 w-3" /> Ja
        </span>
      );
    }

    if (value === false) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-800">
          <X className="h-3 w-3" /> Nein
        </span>
      );
    }

    return <span className="text-slate-500">-</span>;
  };

  const renderGenericValue = (value) => {
    if (typeof value === 'boolean') {
      return renderBooleanPill(value);
    }

    if (value === undefined || value === null || value === '' || value === 'null') {
      return <span className="text-slate-500">-</span>;
    }

    if (typeof value === 'string' && value.includes('<')) {
      return <span dangerouslySetInnerHTML={{ __html: value }} />;
    }

    return <span>{String(value)}</span>;
  };

  const detailTabs = useMemo(
    () => [
      {
        id: 'pricing',
        label: 'Kosten',
        fields: ['yearlyFee', 'fees_pos_foreign', 'fees_atm_eur', 'fees_atm_foreign'],
      },
      {
        id: 'usage',
        label: 'Nutzung',
        fields: ['charge', 'withChecking', 'pinfirst', 'contactless'],
      },
      {
        id: 'extras',
        label: 'Extras',
        fields: ['insurance', 'miles', 'applepay', 'googlepay', 'notes'],
      },
    ],
    []
  );

  const activeFields = useMemo(() => {
    const tab = detailTabs.find((entry) => entry.id === activeTab);
    return tab ? tab.fields : detailTabs[0].fields;
  }, [activeTab, detailTabs]);

  const activeCols = useMemo(
    () => cols.filter((col) => activeFields.includes(col.value)),
    [cols, activeFields]
  );

  return (
    <Card
      className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <CardContent className="p-0">
        <div className="grid gap-0 lg:grid-cols-[170px,1fr]">
          <div className="border-b border-slate-200 bg-slate-50 p-3 lg:border-b-0 lg:border-r">
            {nonAffiliateLink ? (
              <a
                href={nonAffiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block mx-auto w-full max-w-[8.25rem] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative aspect-[1.586/1]">
                  <img
                    alt={`Bild der ${card.Issuer} Karte`}
                    className="absolute inset-0 h-full w-full rounded-xl object-contain shadow-md"
                    src={card.image}
                  />
                </div>
              </a>
            ) : (
              <div className="relative mx-auto aspect-[1.586/1] w-full max-w-[8.25rem]">
                <img
                  alt={`Bild der ${card.Issuer} Karte`}
                  className="absolute inset-0 h-full w-full rounded-xl object-contain shadow-md"
                  src={card.image}
                />
              </div>
            )}

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">
                {chargeLabels[card.charge] || 'Karte'}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  card.withChecking ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {card.withChecking ? 'Mit Girokonto' : 'Ohne Girokonto'}
              </span>
            </div>
          </div>

          <div className="p-4 md:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {nonAffiliateLink ? (
                      <a
                        href={nonAffiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary hover:underline underline-offset-4"
                      >
                        {card.Issuer}
                      </a>
                    ) : (
                      card.Issuer
                    )}
                  </h3>
                </div>
              </div>
              <FeeLabel value={card.yearlyFee} euro={true} />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Jahresgebühr</p>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    card.yearlyFee === 0 ? 'text-emerald-700' : 'text-slate-800'
                  }`}
                >
                  {card.yearlyFee === 0 ? '0 EUR (kostenlos)' : `${card.yearlyFee} EUR`}
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                <div className="flex items-center gap-1">
                  <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Bargeld</p>
                  <div className="group relative">
                    <button
                      type="button"
                      className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-slate-500"
                      aria-label="Hinweis zu Geldautomatengebühren"
                    >
                      <Info className="h-2.5 w-2.5" />
                    </button>
                    <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-72 rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-700 shadow-lg group-hover:block group-focus-within:block">
                      Bei Geldabhebungen gilt: Betreiber von Geldautomaten können eigene Gebühren erheben, die die
                      Kartenausgeber nicht erstatten.
                    </div>
                  </div>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-800">{atmLabel}</p>
                {card.cashAdvanceImmediate && (
                  <p className="mt-1 text-xs font-medium text-rose-700">
                    * Sofort verzinst ({card.cashAdvanceApr || 'siehe Anbieter'})
                    {typeof card.cashAdvanceApr === 'number' ? '% p.a.' : ''}
                  </p>
                )}
              </article>
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Fremdwährung</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{formatForeignFee(card.fees_pos_foreign)}</p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Versicherung</p>
                <div className="mt-1">{renderBooleanPill(card.insurance)}</div>
              </article>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {featureBadges.map((feature) => (
                <span
                  key={feature.label}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    feature.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {feature.label}
                </span>
              ))}
              {card.charge === 'credit' && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                  Geeignet für Mietwagenbuchungen
                </span>
              )}
              {card.charge === 'debit' && card.withChecking && (
                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">
                  Abbuchung direkt vom Girokonto
                </span>
              )}
            </div>

            {showProminentLegalText && card.legalnotes && (
              <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-2.5 text-xs text-amber-900">
                <p className="font-semibold uppercase tracking-[0.08em]">Wichtiger Hinweis</p>
                <p className="mt-1">
                  <span dangerouslySetInnerHTML={{ __html: card.legalnotes }} />
                </p>
              </div>
            )}

            {card.notes && (
              <div className="mt-3 rounded-xl border border-slate-200 bg-white p-2.5 text-sm text-slate-700">
                <span dangerouslySetInnerHTML={{ __html: card.notes }} />
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button
                variant={isCompared ? 'default' : 'outline'}
                className="rounded-full border-slate-300"
                onClick={() => onToggleCompare(card.Issuer)}
                disabled={compareDisabled}
              >
                {isCompared ? 'Im Vergleich' : 'Vergleichen'}
              </Button>
              {card.adlink ? (
                <>
                  <Button asChild className="rounded-full">
                    <a href={card.adlink} target="_blank" rel="noopener noreferrer">
                      Zum Partnerlink*
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-slate-300">
                    <a href={card.link} target="_blank" rel="noopener noreferrer">
                      Direkt zum Anbieter
                    </a>
                  </Button>
                </>
              ) : card.link ? (
                <Button asChild className="rounded-full">
                  <a href={card.link} target="_blank" rel="noopener noreferrer">
                    Direkt beantragen
                  </a>
                </Button>
              ) : null}

            </div>

            <details className="group mt-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <summary className="cursor-pointer list-none px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
                Details anzeigen
              </summary>
              <div className="border-t border-slate-200 p-2 animate-fade-up">
                {card.legalnotes && !showProminentLegalText && (
                  <p className="mt-2 text-xs text-slate-500">
                    <span dangerouslySetInnerHTML={{ __html: card.legalnotes }} />
                  </p>
                )}

                <div className="mt-2 flex flex-wrap gap-1">
                  {detailTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:bg-white/70 hover:text-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div key={activeTab} className="mt-2 animate-fade-up">
                  <Table className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <TableBody>
                      {activeCols.map((col, idx) => (
                        <TableRow key={`${activeTab}-${idx}`} className="hover:bg-slate-50">
                          <TableCell className="w-44 font-medium text-slate-700">{col.label}</TableCell>
                          <TableCell className="text-slate-700">{renderGenericValue(card[col.value])}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </details>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardCard;
