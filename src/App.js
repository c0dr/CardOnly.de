import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import Recommended from './Recommendations/Recommended';
import AktuelleAktionen from './Recommendations/AktuelleAktionen';
import Contact from './Contact/Contact';
import Header from './CommonComponents/Header';
import ScreenSizeAlert from './CommonComponents/ScreenSizeAlert';
import Sparkasse from './Recommendations/JetztIstAllesMoeglich';

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <ScreenSizeAlert/>
          <Header/>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recommended" element={<Recommended />} />
              <Route path="/jetztistallesmoeglich" element={<Sparkasse />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/aktionen" element={<AktuelleAktionen />} />
            </Routes>
          </div>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
