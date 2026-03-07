import React from 'react';
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home/Home';
import Recommended from './Recommendations/Recommended';
import AktuelleAktionen from './Recommendations/AktuelleAktionen';
import Contact from './Contact/Contact';
import Header from './CommonComponents/Header';
import ScreenSizeAlert from './CommonComponents/ScreenSizeAlert';
import Sparkasse from './Recommendations/JetztIstAllesMoeglich';
import CookieConsent from './components/ui/CookieConsent';
import ComparePage from './Compare/ComparePage';

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header/>
          <ScreenSizeAlert/>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recommended" element={<Recommended />} />
              <Route path="/jetztistallesmoeglich" element={<Sparkasse />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/aktionen" element={<AktuelleAktionen />} />
              <Route path="/compare" element={<ComparePage />} />
            </Routes>
          </div>
          <footer className="border-t border-slate-200 bg-white/70">
            <div className="container flex items-center justify-between py-4 text-sm text-slate-600">
              <span>© {new Date().getFullYear()} CardOnly.de</span>
              <Link to="/contact" className="font-medium hover:text-primary hover:underline underline-offset-4">
                Impressum
              </Link>
            </div>
          </footer>
          <CookieConsent />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
