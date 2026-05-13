import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from './alert';
import { Button } from './button';

const GA_MEASUREMENT_ID = 'G-UA-31081827-4';
const SETTINGS_EVENT = 'open-cookie-settings';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    [key: string]: any;
  }
}

const loadAnalytics = () => {
  if (window.gtag) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(`script[data-ga-id="${GA_MEASUREMENT_ID}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('analytics_load_failed')));
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    (script.dataset as any).gaId = GA_MEASUREMENT_ID;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('analytics_load_failed'));
    document.head.appendChild(script);
  }).then(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
  });
};

const setAnalyticsConsent = async (granted: boolean) => {
  const gaDisableKey = `ga-disable-${GA_MEASUREMENT_ID}`;

  if (granted) {
    window[gaDisableKey] = false;
    await loadAnalytics();
    window.gtag?.('consent', 'default', { analytics_storage: 'granted' });
    window.gtag?.('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
    });
    return;
  }

  window[gaDisableKey] = true;

  if (window.gtag) {
    window.gtag('consent', 'update', { analytics_storage: 'denied' });
  }

  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  const cookieCandidates = ['_ga', '_gid', `_ga_${GA_MEASUREMENT_ID.replace(/-/g, '_')}`];
  cookieCandidates.forEach((name) => {
    document.cookie = `${name}=; ${expired}`;
    document.cookie = `${name}=; ${expired}; domain=.${window.location.hostname}`;
  });
};

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');

    if (storedConsent === 'true') {
      setAnalyticsConsent(true).catch(() => {
        // analytics optional
      });
    } else if (storedConsent === 'false') {
      setAnalyticsConsent(false).catch(() => {
        // analytics optional
      });
    } else {
      setShowConsent(true);
    }

    const openSettings = () => setShowConsent(true);
    window.addEventListener(SETTINGS_EVENT, openSettings);

    return () => {
      window.removeEventListener(SETTINGS_EVENT, openSettings);
    };
  }, []);

  const handleAccept = async () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
    await setAnalyticsConsent(true);
  };

  const handleDecline = async () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
    await setAnalyticsConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[min(96vw,28rem)]">
      <Alert className="border shadow-lg">
        <AlertDescription className="flex flex-col gap-4">
          <span>
            Wir verwenden optionale Analyse-Cookies (Google Analytics) nur mit Ihrer Einwilligung. Sie koennen die
            Entscheidung jederzeit ueber "Cookie-Einstellungen" im Footer aendern.
          </span>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <a href="#/datenschutz" className="text-xs text-slate-600 hover:underline">
              Datenschutz
            </a>
            <Button variant="outline" onClick={handleDecline}>
              Ablehnen
            </Button>
            <Button variant="default" onClick={handleAccept}>
              Akzeptieren
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CookieConsent;
