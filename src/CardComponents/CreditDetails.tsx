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
    <section aria-label={`Kreditkosten und Rückzahlung: ${card.Issuer}`} style={{ marginTop: 16, marginBottom: 16, padding: 16, border: '1px solid #cbd5e1', borderRadius: 8, background: '#f8fafc', color: '#0f172a', fontSize: 14, lineHeight: 1.6, textAlign: 'left' }}>
      <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Kreditkosten und Rückzahlung</h4>
      <p style={{ fontSize: 16, fontWeight: 700, marginTop: 8 }}>{creditWarning}</p>
      {example && <>
        <p style={{ marginTop: 8, marginBottom: 12, fontWeight: 600 }}>Repräsentatives Beispiel – Anbieterangaben</p>
        <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px 20px', margin: 0 }}>
          {rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd style={{ margin: 0, fontWeight: 700 }}>{value}</dd></div>)}
        </dl>
        <p style={{ marginTop: 12 }}>Die Beispielannahmen sind keine Zusage für deinen individuellen Kreditrahmen oder Zahlungsplan.</p>
      </>}
      {disclosure.paragraphs.map((text) => <p key={text} style={{ marginTop: 12 }}>{text}</p>)}
      {disclosure.notices.map((text) => <p key={text} style={{ marginTop: 12, fontWeight: 600 }}>{text}</p>)}
      <p style={{ marginTop: 12, marginBottom: 0 }}>
        <a href={disclosure.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>Kreditinformationen des Anbieters</a>
        {' · '}Quellenstand: {disclosure.checkedOn.split('-').reverse().join('.')}
      </p>
    </section>
  );
};

export default CreditDetails;
