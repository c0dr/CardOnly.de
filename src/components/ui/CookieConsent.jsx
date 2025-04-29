import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from './alert';
import { Button } from './button';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
    // Initialize Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
    // Disable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 z-50">
      <Alert className="rounded-none border shadow-lg">
        <AlertDescription className="flex flex-col gap-4">
          <span>
            Diese Website verwendet Cookies und Google Analytics, um Ihre Erfahrung zu verbessern. 
            Sie können wählen, ob Sie diese akzeptieren möchten.
          </span>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleDecline} className="rounded-none">
              Ablehnen
            </Button>
            <Button variant="default" onClick={handleAccept} className="rounded-none">
              Akzeptieren
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CookieConsent;