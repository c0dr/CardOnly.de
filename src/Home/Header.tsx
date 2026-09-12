import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { Card } from '../types';
import { recommendedCardProfiles } from '../lib/recommendedCards';

interface HeaderProps {
  filterChange: (key: string, value: any) => void;
  resetFilters: () => void;
  enabledFilters: Record<string, any>;
  cards: Card[];
}

const Header: React.FC<HeaderProps> = ({ filterChange, resetFilters, enabledFilters, cards }) => {
  const quickFilters = [
    { label: 'Alle Karten', active: Object.keys(enabledFilters).length === 0, values: {} },
    { label: 'Ohne Jahresgebühr', active: enabledFilters.yearlyFee === 0, values: { yearlyFee: 0 } },
    { label: 'Für Reisen', active: enabledFilters.freeATM?.includes('fees_atm_foreign'), values: { freeATM: ['fees_atm_foreign'], fees_pos_foreign: ['fees_pos_foreign'] } },
    { label: 'Echte Kreditkarte', active: enabledFilters.charge?.includes('credit'), values: { charge: ['credit'] } },
    { label: 'Meilen & Punkte', active: enabledFilters.miles === true, values: { miles: true } },
  ];
  const jumpToComparison = () => document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const heroCards = recommendedCardProfiles.map((profile) => cards.find((card) => card.Issuer === profile.issuer)).filter((card): card is Card => Boolean(card)).slice(0, 3);

  return (
    <section className="home-intro">
      <div className="card-hero">
        <div className="hero-copy">
          <p className="hero-eyebrow"><span /> Kreditkarten. Klar verglichen.</p>
          <h1 className="hero-title">Dein Leben.<br />Deine Karte<span className="hero-period">.</span></h1>
          <p className="hero-description">Für den Alltag. Für die nächste Reise. Finde die Karte, die zu dir passt – und sieh, was sie wirklich kostet.</p>
          <div className="hero-actions">
            <button type="button" onClick={jumpToComparison} className="hero-button">Karte finden <ArrowDown size={18} /></button>
            <Link to="/best" className="hero-link">Unsere Empfehlungen <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="hero-display" aria-label="Eine Auswahl der verglichenen Karten">
          <div className="display-orbit" aria-hidden="true" />
          <span className="display-caption">WENIGER GEBÜHREN. MEHR MÖGLICHKEITEN.</span>
          <div className="card-fan">
            {heroCards.map((card, index) => <img key={card.Issuer} src={card.image} alt={card.Issuer} className={`fan-card fan-card-${index}`} />)}
          </div>
          <div className="display-foot"><span>DEINE NÄCHSTE KARTE</span><span aria-hidden="true">↗</span></div>
        </div>
        <div className="hero-bottom">
          <span><strong>{cards.length || '70+'}</strong> Karten im Vergleich</span>
          <span>Jahresgebühr <span aria-hidden="true">/</span> Ausland <span aria-hidden="true">/</span> Bargeld</span>
          <span>Kredit & Debit</span>
        </div>
      </div>
      <div className="quick-filter-strip">
        <div className="quick-filter-list" aria-label="Karten schnell filtern">
          <span className="filter-label">Was ist dir wichtig?</span>
          {quickFilters.map((filter, index) => (
            <button key={filter.label} type="button" aria-pressed={Boolean(filter.active)} onClick={() => {
              resetFilters();
              Object.entries(filter.values).forEach(([key, value]) => filterChange(key, value));
              jumpToComparison();
            }} className={`quick-filter ${filter.active ? 'is-active' : ''}`}>
              <span className="filter-number">0{index + 1}</span>{filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Header;
