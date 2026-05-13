import React from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from './Home/Home';
import Recommended from './Recommendations/Recommended';
import AktuelleAktionen from './Recommendations/AktuelleAktionen';
import BestCardsPage from './Recommendations/BestCardsPage';
import Header from './CommonComponents/Header';
import ScreenSizeAlert from './CommonComponents/ScreenSizeAlert';
import Sparkasse from './Recommendations/JetztIstAllesMoeglich';
import CookieConsent from './components/ui/CookieConsent';
import ComparePage from './Compare/ComparePage';
import Impressum from './Legal/Impressum';
import Datenschutz from './Legal/Datenschutz';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header/>
          <ScreenSizeAlert/>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/best" element={<BestCardsPage />} />
              <Route path="/best/:category" element={<BestCardsPage />} />
              <Route path="/recommended" element={<Recommended />} />
              <Route path="/jetztistallesmoeglich" element={<Sparkasse />} />
              <Route path="/contact" element={<Navigate to="/impressum" replace />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/aktionen" element={<AktuelleAktionen />} />
              <Route path="/compare" element={<ComparePage />} />
            </Routes>
          </div>
          <footer className="border-t border-border">
            <div className="container py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">CardOnly.de</p>
                  <p className="mt-1 max-w-md text-xs leading-relaxed text-muted-foreground">
                    Redaktionell gepflegter Kreditkartenvergleich. Provisionen über gekennzeichnete Partnerlinks haben keinen Einfluss auf Bewertung oder Reihenfolge.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <a href="/topic/" className="hover:text-foreground">Themen</a>
                  <a href="/card/" className="hover:text-foreground">Karten</a>
                  <Link to="/impressum" className="hover:text-foreground">Impressum</Link>
                  <Link to="/datenschutz" className="hover:text-foreground">Datenschutz</Link>
                  <a href="/llms.txt" className="hover:text-foreground">llms.txt</a>
                  <button
                    type="button"
                    className="hover:text-foreground"
                    onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
                  >
                    Cookies
                  </button>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground/60">© {new Date().getFullYear()} CardOnly.de</p>
            </div>
          </footer>
          <CookieConsent />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
