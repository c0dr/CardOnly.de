import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, BadgeEuro, CheckCircle2, Gift, LayoutGrid, Plane, WalletCards } from 'lucide-react';
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
    { label: 'Alle ansehen', icon: LayoutGrid, active: Object.keys(enabledFilters).length === 0, values: {} },
    { label: 'Ohne Jahresgebühr', icon: BadgeEuro, active: enabledFilters.yearlyFee === 0, values: { yearlyFee: 0 } },
    { label: 'Sicher auf Reisen', icon: Plane, active: enabledFilters.freeATM?.includes('fees_atm_foreign'), values: { freeATM: ['fees_atm_foreign'], fees_pos_foreign: ['fees_pos_foreign'] } },
    { label: 'Flexibel bezahlen', icon: WalletCards, active: enabledFilters.charge?.includes('credit'), values: { charge: ['credit'] } },
    { label: 'Punkte sammeln', icon: Gift, active: enabledFilters.miles === true, values: { miles: true } },
  ];
  const jumpToComparison = () => document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const heroCards = recommendedCardProfiles.map((profile) => cards.find((card) => card.Issuer === profile.issuer)).filter((card): card is Card => Boolean(card)).slice(0, 3);

  return (
    <section className="home-intro">
      <div className="card-hero">
        <div className="hero-copy">
          <p className="hero-eyebrow"><span /> Kostenloser Kreditkartenvergleich</p>
          <h1 className="hero-title">Welche Kreditkarte<br />{' '}passt wirklich zu dir<span className="hero-period">?</span></h1>
          <p className="hero-description">Sag uns, was dir wichtig ist. Wir zeigen dir passende Karten – transparent erklärt, fair bewertet und ohne Fachchinesisch.</p>
          <div className="hero-actions">
            <button type="button" onClick={jumpToComparison} className="hero-button">Passende Karte finden <ArrowDown size={18} /></button>
            <Link to="/best" className="hero-link">Karten nach Kriterien ansehen <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="hero-assurances" aria-label="Vorteile des Vergleichs">
            <span><CheckCircle2 /> Ohne Anmeldung</span>
            <span><CheckCircle2 /> Kostenlos</span>
            <span><CheckCircle2 /> Unabhängig</span>
          </div>
        </div>
        <div className="hero-display" aria-label="Eine Auswahl der verglichenen Karten">
          <div className="display-orbit" aria-hidden="true" />
          <span className="display-caption">AUSWAHL STATT ÜBERFORDERUNG</span>
          <div className="card-fan">
            {heroCards.map((card, index) => <img key={card.Issuer} src={card.image} alt={card.Issuer} className={`fan-card fan-card-${index}`} />)}
          </div>
          <div className="display-foot"><span>PASSEND ZU DEINEM ALLTAG</span><span aria-hidden="true">↗</span></div>
        </div>
        <div className="hero-bottom">
          <span><strong>{cards.length || '70+'}</strong> Karten geprüft</span>
          <span><strong>0 €</strong> für deinen Vergleich</span>
          <span><strong>100%</strong> unabhängig bewertet</span>
        </div>
      </div>
      <div className="quick-filter-strip">
        <div className="quick-filter-list" aria-label="Karten schnell filtern">
          <span className="filter-label"><strong>Was suchst du?</strong><small>Wähle einen schnellen Einstieg</small></span>
          {quickFilters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button key={filter.label} type="button" aria-pressed={Boolean(filter.active)} onClick={() => {
                resetFilters();
                Object.entries(filter.values).forEach(([key, value]) => filterChange(key, value));
                jumpToComparison();
              }} className={`quick-filter ${filter.active ? 'is-active' : ''}`}>
                <Icon aria-hidden="true" />{filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Header;
