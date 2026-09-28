import React, { useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableRow, TableCell } from '../components/ui/table';
import { BadgePercent, Check, X, ChevronDown, Clock3, Star } from 'lucide-react';
import { getCardDetailPath } from '../lib/seo';
import { getRecommendedCardProfile } from '../lib/recommendedCards';
import { cardHighlights } from '../lib/cardHighlights';
import { formatOfferDeadline, getActiveCardOffer, getOfferTimingLabel } from '../lib/cardOffers';
import { getCardRating } from '../lib/cardRatings';
import { Card } from '../types';
import SchemeBadge from './SchemeBadge';
import UsageFees from './UsageFees';

const chargeLabels: Record<string, string> = {
  charge: 'Charge',
  credit: 'Credit',
  debit: 'Debit',
  prepaid: 'Prepaid',
};

const formatForeignFee = (value: string | number | undefined | null) => {
  if (value === 0) return '0%';
  if (value === undefined || value === null || value === '' || value === 'null') return '–';
  return value;
};

const formatForeignFeeCompact = (value: string | number | undefined | null) => {
  const formatted = formatForeignFee(value);
  if (typeof formatted !== 'string' || formatted === '–' || formatted === '0%') return formatted;

  const percentages = formatted.match(/\d+(?:[,.]\d+)?\s*%/g);
  if (percentages?.length) {
    return percentages.slice(0, 2).join(' + ');
  }

  return formatted.length > 18 ? `${formatted.slice(0, 17).trim()}…` : formatted;
};

const hasConditionalFreeAtm = (value: string | number | undefined | null) => {
  if (typeof value !== 'string') {
    return false;
  }

  return (
    /ab\s*\d+\s*(€|eur|euro)/i.test(value) &&
    /(kostenlos|gebührenfrei|gebuehrenfrei|0\s*(€|eur|euro))/.test(value.toLowerCase())
  );
};

const formatAtmFee = (value: string | number | undefined | null, card: Card) => {
  if (value === 0) {
    return { label: 'Kostenlos', highlight: true, note: card.cashAdvanceImmediate ? '**' : '' };
  }

  if (hasConditionalFreeAtm(value)) {
    return { label: 'Kostenlos', highlight: true, note: '*' };
  }

  if (value === undefined || value === null || value === '' || value === 'null') {
    return { label: '–', highlight: false, note: '' };
  }

  return { label: 'Kostenpflichtig', highlight: false, note: '' };
};

interface MetricProps {
  label: string;
  value: string;
  highlight?: boolean;
  title?: string;
  size?: 'sm' | 'md';
}

const Metric: React.FC<MetricProps> = ({ label, value, highlight, title, size = 'md' }) => (
  <div className="min-w-0">
    <p className="text-xs font-medium text-slate-400">{label}</p>
    <p
      title={title}
      className={`mt-0.5 truncate font-semibold tabular-nums ${size === 'md' ? 'text-[15px]' : 'text-sm'} ${
        highlight ? 'text-emerald-600' : 'text-foreground'
      }`}
    >
      {value}
    </p>
  </div>
);

interface CardCardProps {
  card: Card;
  cols: any[];
  index: number;
  onToggleCompare?: (issuer: string) => void;
  isCompared?: boolean;
  compareDisabled?: boolean;
  simple?: boolean;
}

const CardCard: React.FC<CardCardProps> = ({ card, cols, index, onToggleCompare, isCompared = false, compareDisabled = false, simple = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const nonAffiliateLink = card.link || null;
  const recommendedProfile = useMemo(() => getRecommendedCardProfile(card.Issuer), [card.Issuer]);
  const atmEur = useMemo(() => formatAtmFee(card.fees_atm_eur, card), [card]);
  const atmForeign = useMemo(() => formatAtmFee(card.fees_atm_foreign, card), [card]);
  const rating = useMemo(() => getCardRating(card), [card]);
  const highlights = useMemo(() => (simple ? cardHighlights(card) : []), [card, simple]);
  const activeOffer = useMemo(() => getActiveCardOffer(card), [card]);

  const allDetailCols = useMemo(() => {
    const detailFields = ['scheme', 'yearlyFee', 'fees_pos_foreign', 'fees_atm_eur', 'fees_atm_foreign', 'charge', 'withChecking', 'pinfirst', 'offlinepin', 'contactless', 'insurance', 'miles', 'applepay', 'googlepay', 'notes'];
    return cols.filter((col) => detailFields.includes(col.value));
  }, [cols]);

  const renderValue = (value: any) => {
    if (value === true) {
      return (
        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-emerald-600">
          <Check className="h-3.5 w-3.5" /> Ja
        </span>
      );
    }
    if (value === false) {
      return (
        <span className="inline-flex items-center gap-1 text-[13px] text-muted-foreground">
          <X className="h-3.5 w-3.5" /> Nein
        </span>
      );
    }
    if (value === undefined || value === null || value === '' || value === 'null') {
      return <span className="text-muted-foreground">–</span>;
    }
    if (typeof value === 'string' && value.includes('<')) {
      return <span dangerouslySetInnerHTML={{ __html: value }} />;
    }
    return <span>{String(value)}</span>;
  };

  const providerButton = (card.adlink || card.link) && (
    <Button asChild size="sm" className="h-9 rounded-lg px-4 text-[13px] font-semibold shadow-card">
      <a href={card.adlink || card.link} target="_blank" rel="noopener noreferrer">
        Zum Anbieter
        {card.adlink && <span className="ml-1 text-[10px] opacity-60">*</span>}
      </a>
    </Button>
  );

  return (
    <article
      className={`comparison-card group border bg-card transition-all ${
        isCompared
          ? 'border-accent/50 ring-1 ring-accent/40'
          : activeOffer
          ? 'border-amber-300 shadow-card hover:border-amber-400 hover:shadow-lift'
          : 'border-border shadow-card hover:border-slate-300 hover:shadow-lift'
      }`}
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
    >
      {/* Main row */}
      <div className="p-4 sm:p-5">
        <div className="comparison-heading flex items-center gap-3 sm:gap-4">
          {/* Rank */}
          {!simple && (
            <span className="hidden w-6 flex-shrink-0 text-center text-sm font-medium tabular-nums text-slate-400 sm:block">
              {index + 1}
            </span>
          )}

          {/* Card image */}
          <div className="comparison-image relative flex-shrink-0">
            {nonAffiliateLink ? (
              <a href={nonAffiliateLink} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                <img alt={card.Issuer} className="h-full w-full rounded-md object-contain" src={card.image} />
              </a>
            ) : (
              <img alt={card.Issuer} className="h-full w-full rounded-md object-contain" src={card.image} />
            )}
          </div>

          {/* Name + type */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
                {nonAffiliateLink ? (
                  <a
                    href={nonAffiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-2"
                  >
                    {card.Issuer}
                  </a>
                ) : (
                  card.Issuer
                )}
              </h3>
              {simple && (
                <span
                  className="inline-flex flex-shrink-0 items-center gap-1 text-[11px] font-semibold tabular-nums text-accent"
                  title={rating.label}
                >
                  <Star className="h-3 w-3" />
                  {rating.score}
                </span>
              )}
              {recommendedProfile && (
                <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Empfehlung
                </span>
              )}
              {!simple && <SchemeBadge scheme={card.scheme} />}
            </div>
            {simple ? (
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {highlights.length > 0 ? highlights.join(' · ') : chargeLabels[card.charge as string] || 'Karte'}
              </p>
            ) : (
              <div className="mt-0.5 flex items-center gap-2">
                <p className="truncate text-[13px] text-muted-foreground">
                  {chargeLabels[card.charge as string] || 'Karte'}
                  {card.withChecking ? ' · Girokonto' : ''}
                </p>
              </div>
            )}
          </div>

          {/* Simple mode: fee on the right */}
          {simple && (
            <div className="comparison-price flex-shrink-0 text-right">
              <p className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                {Number(card.yearlyFee) === 0 ? '0 €' : `${card.yearlyFee} €`}
              </p>
              <p className="text-[11px] text-muted-foreground">pro Jahr</p>
            </div>
          )}

          {/* Key metrics — desktop */}
          {!simple && (
            <div className="hidden items-start divide-x divide-border lg:flex">
              <Metric
                label="Score"
                value={String(rating.score)}
                size="sm"
                title={rating.label}
              />
              <div className="px-5"><Metric label="Jahresgebühr" value={card.yearlyFee === 0 ? '0 €' : `${card.yearlyFee} €`} highlight={card.yearlyFee === 0} /></div>
              <div className="px-5"><Metric label="ATM Euro" value={`${atmEur.label}${atmEur.note}`} highlight={atmEur.highlight} /></div>
              <div className="px-5"><Metric label="ATM weltweit" value={`${atmForeign.label}${atmForeign.note}`} highlight={atmForeign.highlight} /></div>
              <div className="pl-5">
                <Metric
                  label="Fremdwährung"
                  value={String(formatForeignFeeCompact(card.fees_pos_foreign))}
                  highlight={card.fees_pos_foreign === 0}
                  title={String(formatForeignFee(card.fees_pos_foreign))}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="ml-auto flex flex-shrink-0 items-center gap-2 lg:ml-2">
            {!simple && <div className="hidden sm:block">{providerButton}</div>}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border border-transparent transition-colors ${
                isOpen ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
              aria-label={isOpen ? 'Details ausblenden' : 'Details anzeigen'}
              aria-expanded={isOpen}
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {activeOffer && (
          <div
            className="mt-4 flex flex-col gap-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950 sm:flex-row sm:items-center"
            role="note"
            aria-label={`Befristetes Angebot: ${activeOffer.title}`}
          >
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <span className="mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-amber-200/70">
                <BadgePercent className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700">Befristetes Angebot</p>
                <p className="mt-0.5 text-sm font-semibold">{activeOffer.title}</p>
                <p className="mt-0.5 text-xs leading-5 text-amber-900/80">{activeOffer.description}</p>
              </div>
            </div>
            <span
              className="inline-flex flex-shrink-0 items-center gap-1.5 self-start rounded-full bg-amber-200 px-3 py-1.5 text-xs font-semibold tabular-nums sm:self-center"
              title={`Gültig bis ${formatOfferDeadline(activeOffer.endsAt)}`}
            >
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
              {getOfferTimingLabel(activeOffer.endsAt)}
            </span>
          </div>
        )}

        {/* Mobile key metrics */}
        {!simple && (
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/70 pt-4 sm:grid-cols-4 lg:hidden">
            <div className="sm:hidden">
              <p className="text-xs font-medium text-slate-400">Bewertung</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-sm font-semibold tabular-nums text-foreground">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {rating.score}
              </p>
            </div>
            <Metric size="sm" label="Jahresgebühr" value={card.yearlyFee === 0 ? '0 €' : `${card.yearlyFee} €`} highlight={card.yearlyFee === 0} />
            <Metric size="sm" label="ATM Euro" value={`${atmEur.label}${atmEur.note}`} highlight={atmEur.highlight} />
            <Metric size="sm" label="ATM weltweit" value={`${atmForeign.label}${atmForeign.note}`} highlight={atmForeign.highlight} />
            <Metric
              size="sm"
              label="Fremdwährung"
              value={String(formatForeignFeeCompact(card.fees_pos_foreign))}
              highlight={card.fees_pos_foreign === 0}
              title={String(formatForeignFee(card.fees_pos_foreign))}
            />
          </div>
        )}

        {simple && <UsageFees card={card} />}

        {/* Simple mode: prominent full-width CTA */}
        {simple && (
          <div className="comparison-actions mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
            {onToggleCompare && (
              <button type="button" className="compare-toggle" aria-pressed={isCompared} disabled={compareDisabled} onClick={() => onToggleCompare(card.Issuer)}>
                <span aria-hidden="true">{isCompared ? '✓' : '+'}</span>
                {isCompared ? 'Im Vergleich' : 'Vergleichen'}
              </button>
            )}
            {(card.adlink || card.link) && (
              <Button asChild size="sm" className="provider-action h-10 rounded-md px-5 text-[13px] font-semibold shadow-none">
                <a href={card.adlink || card.link} target="_blank" rel="noopener noreferrer">
                  Zum Anbieter
                  {card.adlink && <span className="ml-1 text-[10px] opacity-60">*</span>}
                </a>
              </Button>
            )}
            <Button asChild variant="ghost" size="sm" className="h-10 rounded-lg px-4 text-[13px] text-muted-foreground hover:text-foreground">
              <a href={getCardDetailPath(card.Issuer)}>Details</a>
            </Button>
          </div>
        )}

        {/* Provider button row for small screens */}
        {!simple && <div className="mt-4 sm:hidden">{providerButton}</div>}
      </div>

      {/* Legal/Notes - visible without expansion */}
      {(card.notes || card.legalnotes) && (
        <div className="comparison-notes border-t border-border/70 px-5 py-3">
          {card.notes && (
            <p className="text-[13px] leading-relaxed text-foreground/90">
              <span dangerouslySetInnerHTML={{ __html: card.notes }} />
            </p>
          )}
          {card.legalnotes && (
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              <span dangerouslySetInnerHTML={{ __html: card.legalnotes }} />
            </p>
          )}
        </div>
      )}

      {/* Expanded details */}
      {isOpen && (
        <div className="border-t border-border/70 animate-fade-up">
          {/* Detail table */}
          <div className="p-5 sm:p-6">
            <Table className="text-sm">
              <TableBody>
                {allDetailCols.map((col, idx) => (
                  <TableRow key={idx} className="border-b border-border/60 last:border-0 hover:bg-transparent">
                    <TableCell className="w-1/3 py-2.5 pl-0 align-top text-[13px] text-muted-foreground">{col.label}</TableCell>
                    <TableCell className="py-2.5 pr-0 text-[13px] text-foreground">
                      {col.value === 'scheme' ? (
                        <SchemeBadge scheme={card.scheme} />
                      ) : (
                        renderValue(card[col.value])
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Action row */}
          <div className="flex flex-wrap items-center gap-3 border-t border-border/70 bg-secondary/40 px-5 py-3.5 sm:px-6">
            {(card.adlink || card.link) && (
              <Button asChild size="sm" className="h-9 rounded-lg px-4 text-[13px] font-semibold shadow-card">
                <a href={card.adlink || card.link} target="_blank" rel="noopener noreferrer">
                  Zum Anbieter
                  {card.adlink && <span className="ml-1 text-[10px] opacity-60">*</span>}
                </a>
              </Button>
            )}

            {onToggleCompare && (
              <Button
                variant={isCompared ? 'secondary' : 'outline'}
                size="sm"
                className={`h-9 rounded-lg border-border px-4 text-[13px] font-medium ${
                  isCompared ? 'bg-accent/10 text-accent hover:bg-accent/15' : 'bg-card'
                }`}
                onClick={() => onToggleCompare(card.Issuer)}
                disabled={compareDisabled}
              >
                {isCompared ? (
                  <>
                    <Check className="mr-1 h-3.5 w-3.5" /> Im Vergleich
                  </>
                ) : (
                  'Vergleichen'
                )}
              </Button>
            )}

            <Button asChild variant="ghost" size="sm" className="h-9 rounded-lg px-4 text-[13px] text-muted-foreground hover:text-foreground">
              <a href={getCardDetailPath(card.Issuer)}>
                Produktseite
              </a>
            </Button>
          </div>
        </div>
      )}
    </article>
  );
};

export default CardCard;
