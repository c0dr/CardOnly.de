import React from 'react';
import { Info } from 'lucide-react';

const AtmFeeNotice: React.FC = () => {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-[13px] leading-5 text-muted-foreground shadow-card">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      <p>
        <strong className="font-semibold text-foreground">Hinweis zu Bargeldabhebungen:</strong> 0 € Abhebegebühr bedeutet, dass der Kartenherausgeber keine eigene Abhebegebühr berechnet. Zinsen und separate Automatenentgelte können trotzdem anfallen. Bei manchen Kreditkarten werden Abhebungen ab dem Buchungstag verzinst.
      </p>
    </div>
  );
};

export default AtmFeeNotice;
