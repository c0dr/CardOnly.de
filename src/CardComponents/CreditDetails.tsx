import React from 'react';
import { Card } from '../types';
import { creditWarning } from '../lib/creditNotice';

const number = (value: number) => value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CreditDetails: React.FC<{ card: Card }> = ({ card }) => {
  const disclosure = card.creditDisclosure;
  if (!disclosure) return null;
  const example = disclosure.example;
  const rows: Array<[string, string]> = [];
  if (example) {
    rows.push(['Nettodarlehensbetrag', `${number(example.principal)} €`]);
    rows.push([`Sollzins (${example.borrowingRateType === 'fixed' ? 'fest' : 'veränderlich'})`, `${number(example.borrowingRatePercent)} % p. a.`]);
    rows.push(['Effektiver Jahreszins', `${number(example.aprPercent)} %`]);
    const term = example.termMonths ?? example.assumedTermMonths;
    if (term !== undefined) rows.push(['Zeitraum im Beispiel', `${term} Monate${example.assumedTermMonths ? ' (Annahme)' : ''}`]);
    if (example.installmentCount != null) rows.push(['Anzahl der Raten', String(example.installmentCount)]);
    if (example.regularInstallment != null) rows.push(['Monatliche Kreditrate', `${example.regularInstallmentCount ? `${example.regularInstallmentCount} × ` : ''}${number(example.regularInstallment)} €`]);
    if (example.finalInstallment !== undefined) rows.push(['Letzte Kreditrate', `${number(example.finalInstallment)} €`]);
    if (example.cardFeePerMonth !== undefined) rows.push(['Zusätzliches Kartenentgelt', `${number(example.cardFeePerMonth)} € / Monat`]);
    if (example.interestCosts !== undefined) rows.push(['Zinskosten im Beispiel', `${number(example.interestCosts)} €`]);
    rows.push(['Gesamtbetrag', `${number(example.totalPayable)} €${example.totalIncludesCardFee ? ' inkl. Kartenentgelt' : ''}`]);
  }
  return (
    <section aria-label={`Kreditkosten und Rückzahlung: ${card.Issuer}`} style={{ marginTop: 10, marginBottom: 10, paddingTop: 10, borderTop: '1px solid #e2e8f0', color: '#334155', fontSize: 13, lineHeight: 1.5, textAlign: 'left' }}>
      <h4 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Kreditkosten und Rückzahlung</h4>
      <p style={{ fontSize: 14, fontWeight: 700, margin: '4px 0' }}>{creditWarning}</p>
      {example && <>
        <p style={{ margin: '4px 0', fontWeight: 600 }}>Repräsentatives Beispiel – Anbieterangaben</p>
        <dl style={{ margin: 0 }}>
          {rows.map(([label, value], index) => <div key={label} style={{ display: 'inline' }}>
            <dt style={{ display: 'inline' }}>{label}: </dt>
            <dd style={{ display: 'inline', margin: 0, fontWeight: label.startsWith('Sollzins') || label === 'Effektiver Jahreszins' ? 600 : 400 }}>{value}{index < rows.length - 1 ? '; ' : '.'}</dd>
          </div>)}
        </dl>
        <p style={{ margin: '4px 0' }}>Die Beispielannahmen sind keine Zusage für deinen individuellen Kreditrahmen oder Zahlungsplan.</p>
      </>}
      {disclosure.paragraphs.length > 0 && <p style={{ margin: '4px 0' }}>{disclosure.paragraphs.join(' ')}</p>}
      {disclosure.notices.length > 0 && <p style={{ margin: '4px 0' }}>{disclosure.notices.join(' ')}</p>}
      <p style={{ marginTop: 6, marginBottom: 0, fontSize: 12 }}>
        <a href={disclosure.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>Kreditinformationen des Anbieters</a>
        {' · '}Quellenstand: {disclosure.checkedOn.split('-').reverse().join('.')}
      </p>
    </section>
  );
};

export default CreditDetails;
