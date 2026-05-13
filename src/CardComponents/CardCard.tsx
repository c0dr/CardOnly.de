import React, { useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableRow, TableCell } from '../components/ui/table';
import { Check, X, ChevronDown, Star } from 'lucide-react';
import { getCardDetailPath } from '../lib/seo';
import { getRecommendedCardProfile } from '../lib/recommendedCards';
import { getCardRating } from '../lib/cardRatings';
import { Card } from '../types';
import SchemeBadge from './SchemeBadge';

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

interface CardCardProps {
  card: Card;
  cols: any[];
  index: number;
  onToggleCompare?: (issuer: string) => void;
  isCompared?: boolean;
  compareDisabled?: boolean;
}

const CardCard: React.FC<CardCardProps> = ({ card, cols, index, onToggleCompare, isCompared = false, compareDisabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const nonAffiliateLink = card.link || null;
  const recommendedProfile = useMemo(() => getRecommendedCardProfile(card.Issuer), [card.Issuer]);
  const atmEur = useMemo(() => formatAtmFee(card.fees_atm_eur, card), [card]);
  const atmForeign = useMemo(() => formatAtmFee(card.fees_atm_foreign, card), [card]);
  const rating = useMemo(() => getCardRating(card), [card]);

  const allDetailCols = useMemo(() => {
    const detailFields = ['scheme', 'yearlyFee', 'fees_pos_foreign', 'fees_atm_eur', 'fees_atm_foreign', 'charge', 'withChecking', 'pinfirst', 'offlinepin', 'contactless', 'insurance', 'miles', 'applepay', 'googlepay', 'notes'];
    return cols.filter((col) => detailFields.includes(col.value));
  }, [cols]);

  const renderValue = (value: any) => {
    if (value === true) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
          <Check className="h-3 w-3" /> Ja
        </span>
      );
    }
    if (value === false) {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <X className="h-3 w-3" /> Nein
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

  return (
    <article
      className={`group rounded-lg bg-white ring-1 transition-all ${
        isCompared
          ? 'ring-accent/40 shadow-sm'
          : recommendedProfile
          ? 'ring-border shadow-sm'
          : 'ring-border hover:ring-foreground/20'
      }`}
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
    >
      {/* Main row */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Rank */}
          <span className="hidden w-8 flex-shrink-0 text-center text-sm font-bold text-muted-foreground/50 sm:block">
            {index + 1}
          </span>

          {/* Card image */}
          <div className="relative h-12 w-[80px] flex-shrink-0 sm:h-14 sm:w-[88px]">
            {nonAffiliateLink ? (
              <a href={nonAffiliateLink} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                <img alt={card.Issuer} className="h-full w-full rounded object-contain" src={card.image} />
              </a>
            ) : (
              <img alt={card.Issuer} className="h-full w-full rounded object-contain" src={card.image} />
            )}
          </div>

          {/* Name + type */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-bold text-foreground">
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
              {recommendedProfile && (
                <span className="flex-shrink-0 text-xs font-semibold text-accent">
                  Empfehlung
                </span>
              )}
              <SchemeBadge scheme={card.scheme} />
              <span className="flex-shrink-0 inline-flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs font-bold text-foreground">
                <Star className="h-3.5 w-3.5 text-accent" />
                {rating.score}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {chargeLabels[card.charge as string] || 'Karte'}
              {card.withChecking ? ' · Girokonto' : ''}
            </p>
          </div>

          {/* Key metrics — desktop */}
          <div className="hidden items-center gap-8 lg:flex">
            <div className="w-28 text-right">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">Gebühr</p>
              <p className={`text-lg font-bold ${card.yearlyFee === 0 ? 'text-green-600' : 'text-foreground'}`}>
                {card.yearlyFee === 0 ? 'Kostenlos' : `${card.yearlyFee} €`}
              </p>
            </div>

            <div className="w-28 text-right">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">ATM Euro</p>
              <p className={`text-base font-bold ${atmEur.highlight ? 'text-green-600' : 'text-foreground'}`}>
                {atmEur.label}{atmEur.note}
              </p>
            </div>

            <div className="w-32 text-right">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">ATM Fremd</p>
              <p className={`text-base font-bold ${atmForeign.highlight ? 'text-green-600' : 'text-foreground'}`}>
                {atmForeign.label}{atmForeign.note}
              </p>
            </div>

            <div className="w-28 text-right">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">FX-Gebühr</p>
              <p
                className={`text-base font-bold leading-tight ${card.fees_pos_foreign === 0 ? 'text-green-600' : 'text-foreground'}`}
                title={String(formatForeignFee(card.fees_pos_foreign))}
              >
                {formatForeignFeeCompact(card.fees_pos_foreign)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-shrink-0 items-center gap-2">
            {(card.adlink || card.link) && (
              <Button asChild size="sm" className="hidden h-8 rounded-md px-3 text-xs sm:inline-flex">
                <a href={card.adlink || card.link} target="_blank" rel="noopener noreferrer">
                  Zum Anbieter
                  {card.adlink && <span className="ml-1 text-[9px] opacity-60">*</span>}
                </a>
              </Button>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                isOpen ? 'bg-foreground/5 text-foreground' : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
              }`}
              aria-label="Details anzeigen"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile key metrics */}
        <div className="grid grid-cols-3 gap-3 border-t border-border/50 px-5 py-4 text-center md:hidden">
          <div className="flex-1 text-center">
            <p className="text-xs font-medium text-muted-foreground/70">Score</p>
            <p className="text-sm font-bold text-foreground">{rating.label}</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs font-medium text-muted-foreground/70">Gebühr</p>
            <p className={`text-sm font-bold ${card.yearlyFee === 0 ? 'text-green-600' : 'text-foreground'}`}>
              {card.yearlyFee === 0 ? 'Kostenlos' : `${card.yearlyFee} €`}
            </p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs font-medium text-muted-foreground/70">ATM Euro</p>
            <p className={`truncate text-sm font-bold ${atmEur.highlight ? 'text-green-600' : 'text-foreground'}`}>
              {atmEur.label}{atmEur.note}
            </p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs font-medium text-muted-foreground/70">ATM Fremd</p>
            <p className={`truncate text-sm font-bold ${atmForeign.highlight ? 'text-green-600' : 'text-foreground'}`}>
              {atmForeign.label}{atmForeign.note}
            </p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs font-medium text-muted-foreground/70">FX</p>
            <p
              className={`text-sm font-bold leading-tight ${card.fees_pos_foreign === 0 ? 'text-green-600' : 'text-foreground'}`}
              title={String(formatForeignFee(card.fees_pos_foreign))}
            >
              {formatForeignFeeCompact(card.fees_pos_foreign)}
            </p>
          </div>
        </div>
      </div>

      {/* Legal/Notes - visible without expansion */}
      {(card.notes || card.legalnotes) && (
        <div className="border-t border-border/50 bg-muted/30 px-5 py-3">
          {card.notes && (
            <p className="text-xs leading-relaxed text-foreground">
              <span dangerouslySetInnerHTML={{ __html: card.notes }} />
            </p>
          )}
          {card.legalnotes && (
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              <span dangerouslySetInnerHTML={{ __html: card.legalnotes }} />
            </p>
          )}
        </div>
      )}

      {/* Expanded details */}
      {isOpen && (
        <div className="border-t border-border/50 animate-fade-up">
          {/* Detail table */}
          <div className="p-6">
            <Table className="text-sm">
              <TableBody>
                {allDetailCols.map((col, idx) => (
                  <TableRow key={idx} className="border-b border-border/30 last:border-0">
                    <TableCell className="w-1/3 py-3 pl-0 text-xs font-medium text-muted-foreground">{col.label}</TableCell>
                    <TableCell className="py-3 pr-0 text-foreground">
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
          <div className="flex items-center gap-3 border-t border-border/50 px-6 py-4">
            {(card.adlink || card.link) && (
              <Button asChild size="sm" className="h-9 rounded-md px-4 text-sm">
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
                className={`h-9 rounded-md px-4 text-sm ${
                  isCompared ? 'text-accent' : ''
                }`}
                onClick={() => onToggleCompare(card.Issuer)}
                disabled={compareDisabled}
              >
                {isCompared ? '✓ Im Vergleich' : 'Vergleichen'}
              </Button>
            )}

            <Button asChild variant="ghost" size="sm" className="h-9 rounded-md px-4 text-sm text-muted-foreground">
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
