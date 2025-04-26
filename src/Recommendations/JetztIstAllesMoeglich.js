import React, { useState, useEffect, useMemo } from 'react';
import CardCard from '../CardComponents/CardCard';

const JetztIstAllesMoeglich = () => {
  const [cards, setCards] = useState([]);
  
  const allowedIssuers = useMemo(() => [
    "N26",
    "Revolut Premium MasterCard",
    "Monese Simple Debit MasterCard",
    "Consorsfinanz EC Debit MasterCard",
    "bunq Premium",
    "Transferwise Debit MasterCard",
    "Openbank Girokonto ohne Travel-Abo"
  ], []);

  useEffect(() => {
    fetch('data/cards.json')
      .then(response => response.json())
      .catch(console.log)
      .then(cards => cards.filter(card => allowedIssuers.includes(card.Issuer)))
      .then(data => setCards(data));
  }, [allowedIssuers]);

  return (
    <>
      <div 
        className="relative min-h-[500px] bg-cover bg-center flex flex-col justify-end mb-0 p-8"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1554774853-b415df9eeb92?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
        }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Jetzt eine Debit Mastercard (ec-Karte) holen
        </h2>
        <h3 className="text-2xl text-white">
          Egal ob online shoppen oder stationär - jetzt ist alles möglich
        </h3>
      </div>

      <div className="bg-[#2c3e50] text-center py-12">
        <div className="container mx-auto px-4">
          <h4 className="text-xl text-white mb-8">
            Viele deutsche Banken bieten schon eine praktische Deibt Mastercard an. Unsere Empfehlungen:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <CardCard key={index} card={card} index={index} cols={[]} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JetztIstAllesMoeglich;
