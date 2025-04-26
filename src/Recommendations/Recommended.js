import React from 'react';
import Germany from './Germany';
import Worldwide from './Worldwide';

const Recommended = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Unsere Kreditkartenempfehlungen
        </h2>
        
        <p className="text-lg mb-8 text-gray-700">
          Wir empfehlen folgende Karten. Die Auswahl wurde unabhängig von den Provisionen getroffen, 
          die die Anbieter uns bei Eröffnung zahlen. Diese Produkte sind kostenlos und lohnen sich durch ihre Konditionen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Germany />
          </div>
          <div>
            <Worldwide />
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-8 italic">
          Kostenlos im Sinne von unmittelbar anfallender Gebühren. Es können teils Zinsen entstehen.
        </p>
      </div>
    </div>
  );
};

export default Recommended;
