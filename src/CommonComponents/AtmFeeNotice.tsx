import React from 'react';
import { Info } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

const AtmFeeNotice: React.FC = () => {
  return (
    <Alert className="border-blue-200 bg-blue-50 text-blue-950 [&>svg]:text-blue-600">
      <Info className="h-4 w-4" />
      <AlertDescription className="leading-relaxed">
        Wenn ATM-Abhebungen hier als kostenlos bewertet werden, erhebt der Kartenherausgeber keine eigene Gebühr.
        Automatenbetreiber können dennoch ein separates Entgelt verlangen; dieses wird nicht vom Kartenherausgeber
        erstattet. Für diesen Vergleich zählt die Abhebung deshalb als kostenlos.
      </AlertDescription>
    </Alert>
  );
};

export default AtmFeeNotice;
