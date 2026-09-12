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
          <footer className="mt-20 bg-[#0b1220] text-slate-400">
            <div className="container px-4 py-12">
              <div className="flex flex-col gap-10 md:flex-row md:justify-between">
                <div className="max-w-sm">
                  <p className="text-base font-bold tracking-tight text-white">
                    CardOnly<span className="text-blue-400">.de</span>
                  </p>
                  <p className="mt-3 text-sm leading-6">
                    Kreditkarten transparent vergleichen. Redaktionell gepflegt, unabhängig bewertet und verständlich erklärt.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-10 sm:gap-16">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Vergleich</p>
                    <ul className="mt-3 space-y-2.5 text-sm">
                      <li><Link to="/best" className="transition-colors hover:text-white">Bestenlisten</Link></li>
                      <li><a href="/topic/" className="transition-colors hover:text-white">Themen</a></li>
                      <li><a href="/card/" className="transition-colors hover:text-white">Karten</a></li>
                      <li><Link to="/aktionen" className="transition-colors hover:text-white">Aktionen</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Rechtliches</p>
                    <ul className="mt-3 space-y-2.5 text-sm">
                      <li><Link to="/impressum" className="transition-colors hover:text-white">Impressum</Link></li>
                      <li><Link to="/datenschutz" className="transition-colors hover:text-white">Datenschutz</Link></li>
                      <li>
                        <button
                          type="button"
                          className="transition-colors hover:text-white"
                          onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
                        >
                          Cookie-Einstellungen
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs leading-5 text-slate-500 sm:flex-row sm:justify-between">
                <p>© {new Date().getFullYear()} CardOnly.de</p>
                <p>Mit * markierte Links sind Partnerlinks. Sie beeinflussen unsere Bewertung nicht.</p>
              </div>
            </div>
          </footer>
          <CookieConsent />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
