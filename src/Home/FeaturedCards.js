import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import FeeLabel from '../CardComponents/FeeLabel';
import WorldWideFeeLabel from '../CardComponents/WorldWideFeeLabel';
import { CheckCircle2, Info } from 'lucide-react';

const FeaturedCards = ({ cards }) => {
  // Select 3 featured cards (Bank Norwegian, American Express Payback, and Barclays Visa)
  const featuredCards = cards.filter(card => 
    ['Bank Norwegian', 'American Express Payback', 'Barclays Visa'].includes(card.Issuer)
  );

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Empfohlende Karten</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredCards.map((card) => (
          <Card key={card.Issuer} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {card.Issuer}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full max-w-[12rem] aspect-[1.586/1]">
                  <img 
                    alt={`${card.Issuer} Karte`}
                    className="absolute inset-0 w-full h-full object-contain rounded-xl shadow-lg"
                    src={card.image}
                  />
                </div>
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Jahresgebühr:</span>
                    <FeeLabel value={card.yearlyFee} euro={true}/>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Abhebungen:</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-0.5 ${card.fees_atm_eur === 0 && card.fees_atm_foreign === 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {card.fees_atm_eur === 0 && card.fees_atm_foreign === 0 ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          weltweit kostenlos
                        </>
                      ) : (
                        'kostenpflichtig'
                      )}
                    </span>
                  </div>
                </div>
                <Button 
                  asChild 
                  variant="default"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <a href={card.link || card.adlink} target="_blank" rel="noopener noreferrer">
                    Jetzt beantragen
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCards; 