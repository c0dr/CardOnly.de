import React from 'react';
import { creditWarning, creditCostExplanation } from '../lib/creditNotice';

const CreditNotice: React.FC = () => (
  <aside aria-label="Hinweis zu Kreditkosten" className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-base leading-6 text-amber-950">
    <p className="font-bold">{creditWarning}</p>
    <p className="mt-1">{creditCostExplanation}</p>
  </aside>
);

export default CreditNotice;
