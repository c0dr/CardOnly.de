import React, { useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '../components/ui/table';
import { Card } from '../types';

const parseNumber = (value: any): number | null => {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return null;
  const match = value.replace(',', '.').match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
};

const formatValue = (type: string, card: Card): string => {
  switch (type) {
    case 'yearlyFee':
      return card.yearlyFee === 0 ? '0 EUR' : `${card.yearlyFee ?? 'n/a'} EUR`;
    case 'fees_pos_foreign':
      return card.fees_pos_foreign === 0 ? '0%' : String(card.fees_pos_foreign ?? 'n/a');
    case 'fees_atm_foreign':
      return card.fees_atm_foreign === 0 ? '0' : String(card.fees_atm_foreign ?? 'n/a');
    case 'insurance':
      return card.insurance ? 'Ja' : 'Nein';
    case 'miles':
      return card.miles ? 'Ja' : 'Nein';
    default:
      return '-';
  }
};

const getMetricValue = (type: string, card: Card): number | null => {
  switch (type) {
    case 'yearlyFee':
      return parseNumber(card.yearlyFee);
    case 'fees_pos_foreign':
      return parseNumber(card.fees_pos_foreign);
    case 'fees_atm_foreign':
      return parseNumber(card.fees_atm_foreign);
    case 'insurance':
      return card.insurance ? 1 : 0;
    case 'miles':
      return card.miles ? 1 : 0;
    default:
      return null;
  }
};

interface Metric {
  id: string;
  label: string;
  better: 'low' | 'high';
}

const metrics: Metric[] = [
  { id: 'yearlyFee', label: 'Jahresgebühr', better: 'low' },
  { id: 'fees_pos_foreign', label: 'Fremdwährungsentgelt', better: 'low' },
  { id: 'fees_atm_foreign', label: 'ATM Ausland', better: 'low' },
  { id: 'insurance', label: 'Versicherung', better: 'high' },
  { id: 'miles', label: 'Meilen', better: 'high' },
];

interface CompareTableProps {
  cards: Card[];
  onRemove?: (issuer: string) => void;
  onClear?: () => void;
}

const CompareTable: React.FC<CompareTableProps> = ({ cards, onRemove, onClear }) => {
  const bestValues = useMemo(() => {
    const map: Record<string, number | null> = {};
    for (const metric of metrics) {
      const values = cards
        .map((card) => getMetricValue(metric.id, card))
        .filter((value): value is number => typeof value === 'number' && !Number.isNaN(value));

      if (values.length === 0) {
        map[metric.id] = null;
        continue;
      }

      map[metric.id] = metric.better === 'high' ? Math.max(...values) : Math.min(...values);
    }

    return map;
  }, [cards]);

  if (cards.length === 0) return null;

  return (
    <section className="mb-6 animate-fade-up rounded-lg border border-stone-300 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-stone-950">Vergleich ({cards.length}/3)</h3>
          <p className="text-sm text-stone-600">Beste Werte sind gruen markiert.</p>
        </div>
        {onClear && (
          <Button variant="outline" className="rounded-md border-stone-300" onClick={onClear}>
            Vergleich leeren
          </Button>
        )}
      </div>

      <Table className="overflow-hidden rounded-md border border-stone-200">
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold text-stone-700">Karte</TableCell>
            {cards.map((card) => (
              <TableCell key={card.Issuer} className="font-semibold text-stone-950">
                <div className="space-y-2">
                  <div className="mx-auto h-14 w-24 rounded-md border border-stone-200 bg-white p-1">
                    <img src={card.image} alt={`${card.Issuer} Logo`} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="line-clamp-2">{card.Issuer}</span>
                    {onRemove && (
                      <button
                        type="button"
                        className="rounded-md px-2 py-0.5 text-xs text-stone-500 hover:bg-stone-100 hover:text-stone-700"
                        onClick={() => onRemove(card.Issuer)}
                      >
                        Entfernen
                      </button>
                    )}
                  </div>
                </div>
              </TableCell>
            ))}
          </TableRow>

          {metrics.map((metric) => (
            <TableRow key={metric.id}>
              <TableCell className="font-medium text-stone-700">{metric.label}</TableCell>
              {cards.map((card) => {
                const value = getMetricValue(metric.id, card);
                const isBest =
                  typeof value === 'number' && bestValues[metric.id] !== null && value === bestValues[metric.id];
                return (
                  <TableCell
                    key={`${metric.id}-${card.Issuer}`}
                    className={isBest ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-stone-700'}
                  >
                    {formatValue(metric.id, card)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default CompareTable;
