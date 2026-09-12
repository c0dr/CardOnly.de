import React from 'react';
import { Card } from '../types';

const fees = [
  { field: 'fees_pos_foreign', label: 'Bezahlen in Fremdwährung' },
  { field: 'fees_atm_eur', label: 'Abheben im Euroraum' },
  { field: 'fees_atm_foreign', label: 'Abheben außerhalb des Euroraums' },
];

const UsageFees: React.FC<{ card: Card; compact?: boolean }> = ({ card, compact = false }) => (
  <div className={`usage-fees ${compact ? 'usage-fees-compact' : ''}`}>
    <dl className="usage-fee-grid">
      {fees.map(({ field, label }) => {
        const value = card[field];
        const missing = value === undefined || value === null || value === '' || value === 'null';
        const free = !missing && (value === 0 || value === '0' || value === '0%' || value === '0 €');
        return (
          <div className="usage-fee" key={field}>
            <dt>{label}</dt>
            <dd className={free ? 'fee-free' : ''}>
              {missing ? 'Keine Angabe' : free ? (field === 'fees_pos_foreign' ? '0 %' : '0 €') : String(value)}
            </dd>
          </div>
        );
      })}
    </dl>
    {card.cashAdvanceImmediate && <p className="fee-caveat">Bei Bargeldabhebungen fallen sofort Zinsen an.</p>}
  </div>
);

export default UsageFees;
