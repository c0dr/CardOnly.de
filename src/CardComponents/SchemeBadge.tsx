import React from 'react';
import { cn } from '../lib/utils';

type CardScheme = 'visa' | 'mastercard' | 'amex';

interface SchemeBadgeProps {
  scheme?: CardScheme | CardScheme[] | string | string[] | null;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

const schemeLabels: Record<CardScheme, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
};

const SchemeMark: React.FC<{ scheme: CardScheme }> = ({ scheme }) => {
  if (scheme === 'mastercard') {
    return (
      <span className="relative h-4 w-6 flex-shrink-0" aria-hidden="true">
        <span className="absolute left-0 top-0 h-4 w-4 rounded-full bg-[#eb001b]" />
        <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-[#f79e1b] mix-blend-multiply" />
      </span>
    );
  }

  if (scheme === 'amex') {
    return (
      <span
        className="flex h-4 w-6 flex-shrink-0 items-center justify-center rounded-[3px] bg-[#2e77bc] text-[7px] font-black leading-none text-white"
        aria-hidden="true"
      >
        AM
      </span>
    );
  }

  return (
    <span className="flex h-4 min-w-6 flex-shrink-0 items-center justify-center font-black italic leading-none text-[#1434cb]" aria-hidden="true">
      V
    </span>
  );
};

const isCardScheme = (scheme: unknown): scheme is CardScheme =>
  scheme === 'visa' || scheme === 'mastercard' || scheme === 'amex';

const SchemeBadge: React.FC<SchemeBadgeProps> = ({ scheme, label, size = 'sm', className }) => {
  const schemes = (Array.isArray(scheme) ? scheme : [scheme]).filter(isCardScheme);

  if (schemes.length === 0) {
    return null;
  }

  if (schemes.length > 1) {
    return (
      <span className="inline-flex max-w-full flex-wrap items-center gap-1" aria-label={`Kartensystem ${schemes.map((entry) => schemeLabels[entry]).join(' und ')}`}>
        {schemes.map((entry) => (
          <SchemeBadge key={entry} scheme={entry} size={size} className={className} />
        ))}
      </span>
    );
  }

  const [singleScheme] = schemes;
  const displayLabel = label || schemeLabels[singleScheme];

  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 rounded-md border border-border/80 bg-white font-bold text-foreground shadow-[0_1px_0_rgba(15,23,42,0.04)]',
        size === 'md' ? 'h-7 px-2.5 text-xs' : 'h-6 px-2 text-[11px]',
        className
      )}
      aria-label={`Kartensystem ${displayLabel}`}
      title={displayLabel}
    >
      <SchemeMark scheme={singleScheme} />
      <span className="truncate">{displayLabel}</span>
    </span>
  );
};

export default SchemeBadge;
