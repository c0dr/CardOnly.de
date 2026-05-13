import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Barclaycard from '../img/barclaycard.png';
import Amex from '../img/amex.png';

interface Suggestion {
  issuer: string;
  reason: string;
  source: string;
}

const missedCardSuggestions: Suggestion[] = [
  {
    issuer: 'Amazon Visa (Openbank Pay / Zinia)',
    reason:
      'Kreditkarte ohne Jahresgebuehr mit 1% Punkten auf Amazon.de und 0,5% ausserhalb von Amazon.',
    source: 'https://www.openbankpay.com/de/amazon/',
  },
  {
    issuer: 'Commerzbank ClassicKreditkarte',
    reason:
      'Klassische Credit-Option mit 39,90 EUR Jahresgebuehr und Mobile-Payment-Support (Apple Pay/Google Pay).',
    source: 'https://www.commerzbank.de/konten-zahlungsverkehr/produkte/kreditkarten/classickreditkarte/',
  },
  {
    issuer: 'Commerzbank Mastercard Debit',
    reason: '0 EUR Jahresgebuehr, weltweit einsetzbar und Apple/Google Pay laut Produktseite.',
    source: 'https://www.commerzbank.de/konten-zahlungsverkehr/produkte/kreditkarten/mastercard-debit/',
  },
  {
    issuer: 'Postbank Mastercard',
    reason:
      'Credit-Karte mit 29 EUR Jahresgebuehr; laut Produktseite kostenlose Bargeldabhebung im Euroraum.',
    source: 'https://www.postbank.de/privatkunden/produkte/konten-karten/mastercard.html',
  },
  {
    issuer: 'Postbank Card plus (Debitkarte)',
    reason: 'Debitkarte mit 0 EUR Ausgabeentgelt und kontaktloser Zahlung in Verbindung mit dem Girokonto.',
    source: 'https://www.postbank.de/privatkunden/produkte/konten-karten/postbank-card-plus.html',
  },
  {
    issuer: 'norisbank Top-Girokonto mit Mastercard direkt',
    reason:
      'Debit-Variante im Top-Girokonto, laut norisbank mit weltweiten kostenlosen Bargeldabhebungen (ab 50 EUR).',
    source: 'https://www.norisbank.de/girokonto/produkte/girokonto-kreditkarte.html',
  },
];

const Germany: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-6">Die Kombi für Deutschland</h3>
      
      <Card>
        <CardHeader className="flex items-center space-x-2">
          <i aria-hidden="true" className="fa fa-shopping-bag"></i>
          <span>+</span>
          <i aria-hidden="true" className="fa fa-money"></i>
          <span>Gratis Bezahlen und Abheben</span>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <img className="w-48 object-contain" src={Barclaycard} alt="Barclaycard Visa" />
            <div>
              <CardTitle className="mb-4">Barclaycard Visa</CardTitle>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-green-600 mt-1"></i>
                  <span><strong>0€</strong> Jahresgebühr und <strong>0€&nbsp;Abhebungen</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-green-600 mt-1"></i>
                  <span>Langes Zahlungsziel, hohes Limit erreichbar</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-blue-600 mt-1"></i>
                  <span>100% Lastschrift einstellbar</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <Button asChild>
              <a
                href="https://www.barclaycard.de/kreditkarten/visa-kreditkarte"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jetzt beantragen
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center space-x-2">
          <i aria-hidden="true" className="fa fa-shopping-bag"></i>
          <span>Gratis Punkte sammeln in Europa</span>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <img className="w-48 object-contain" src={Amex} alt="American Express Payback" />
            <div>
              <CardTitle className="mb-4">American Express Payback</CardTitle>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-green-600 mt-1"></i>
                  <span><strong>0€</strong> Jahresgebühr</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-green-600 mt-1"></i>
                  <span><strong>1 Payback Punkt pro 2 Euro</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-blue-600 mt-1"></i>
                  <span>2% Gebühren bei Zahlung in Fremdwährung</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <Button asChild>
              <a
                href="https://www.payback.de/info/american-express"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jetzt beantragen
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center space-x-2">
          <i aria-hidden="true" className="fa fa-search"></i>
          <span>Moegliche Ergaenzungen fuer den Vergleich (Stand: 08.03.2026)</span>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            Diese Karten sind aktuell nicht in <code>public/data/cards.json</code> enthalten und eignen sich als
            naechste Kandidaten fuer die Aufnahme.
          </p>
          <ul className="mt-4 space-y-3">
            {missedCardSuggestions.map((card) => (
              <li key={card.issuer} className="rounded-lg border border-slate-200 p-3">
                <p className="font-semibold text-slate-900">{card.issuer}</p>
                <p className="mt-1 text-sm text-slate-700">{card.reason}</p>
                <a
                  href={card.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  Quelle beim Anbieter
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Germany;
