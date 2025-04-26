import React from 'react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Monitor } from 'lucide-react';

const ScreenSizeAlert = () => {
  return (
    <div className="md:hidden">
      <Alert variant="warning" className="mb-4">
        <Monitor className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
        <AlertDescription className="text-sm text-yellow-800 dark:text-yellow-200">
          Für das beste Nutzererlebnis empfehlen wir die Nutzung auf einem Desktop-Computer oder Tablet.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ScreenSizeAlert;
