import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import FeeLabel from '../CardComponents/FeeLabel';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';

const preferredIssuers = ['Bank Norwegian', 'Advanzia Mastercard Gold', 'American Express Payback'];

const getCardCategory = (card) => {
  if (card.Issuer === 'Bank Norwegian') return 'Top Reisekarte';
  if (card.Issuer === 'Advanzia Mastercard Gold') return 'Top Gebührenfrei';
  if (card.Issuer === 'American Express Payback') return 'Top Bonusprogramm';
  return 'Top Auswahl';
};

const getCardHighlights = (card) => {
  const highlights = [];

  if (card.insurance) highlights.push('Mit Versicherungsleistungen');
  if (card.yearlyFee === 0) highlights.push('Keine Jahresgebühr');
  if (card.fees_atm_foreign === 0) highlights.push('Weltweit kostenlos abheben');
  if (card.fees_pos_foreign === 0) highlights.push('0% Fremdwährungsentgelt');
  if (!card.withChecking) highlights.push('Ohne Girokonto beantragbar');
  if (card.applepay || card.googlepay) highlights.push('Mobile Wallet ready');

  return highlights.slice(0, 3);
};

const FeaturedCards = ({ cards }) => {
  const cardByIssuer = new Map(cards.map((card) => [card.Issuer, card]));
  const featuredCards = preferredIssuers.map((issuer) => cardByIssuer.get(issuer)).filter(Boolean);

  if (featuredCards.length === 0) {
    return null;
  }

  return (
    <section className="mb-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Empfohlene Karten</h2>
          <p className="text-sm text-slate-600">Handverlesen: Bank Norwegian, Advanzia und Amex Payback.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {featuredCards.map((card, index) => (
          <Card
            key={`${card.Issuer}-${index}`}
            className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <CardContent className="p-0">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{getCardCategory(card)}</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">
                  {card.link ? (
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary hover:underline underline-offset-4"
                    >
                      {card.Issuer}
                    </a>
                  ) : (
                    card.Issuer
                  )}
                </h3>
              </div>

              <div className="space-y-4 p-5">
                {card.link ? (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mx-auto w-full max-w-[12rem] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div className="relative aspect-[1.586/1]">
                      <img
                        alt={`${card.Issuer} Karte`}
                        className="absolute inset-0 h-full w-full rounded-xl object-contain shadow-md"
                        src={card.image}
                      />
                    </div>
                  </a>
                ) : (
                  <div className="relative mx-auto aspect-[1.586/1] w-full max-w-[12rem]">
                    <img
                      alt={`${card.Issuer} Karte`}
                      className="absolute inset-0 h-full w-full rounded-xl object-contain shadow-md"
                      src={card.image}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <span className="text-sm font-medium text-slate-700">Jahresgebühr</span>
                  <FeeLabel value={card.yearlyFee} euro={true} />
                </div>

                <ul className="space-y-1.5 text-sm text-slate-700">
                  {getCardHighlights(card).map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full rounded-full">
                  <a href={card.link || card.adlink} target="_blank" rel="noopener noreferrer">
                    Zur Karte
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCards;
