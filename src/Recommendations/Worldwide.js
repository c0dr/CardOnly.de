import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Barclaycard from '../img/barclaycard.png';

const Worldwide = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-6">Die Kombi für Reisende</h3>
      
      <Card>
        <CardHeader className="flex items-center space-x-2">
          <i aria-hidden="true" className="fa fa-shopping-bag"></i>
          <span>+</span>
          <i aria-hidden="true" className="fa fa-money"></i>
          <span>Gratis Bezahlen und Abheben weltweit</span>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <img className="w-48 object-contain" src={Barclaycard} alt="Barclaycard" />
            <div>
              <CardTitle className="mb-4">Barclaycard Visa</CardTitle>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-green-600 mt-1"></i>
                  <span><strong>0€</strong> Jahresgebühr</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-green-600 mt-1"></i>
                  <span><strong>0€</strong> für Abhebungen weltweit</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-green-600 mt-1"></i>
                  <span>100% Lastschrift einstellbar</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <Button asChild>
              <a
                href="https://www.barclaycard.de/kreditkarten/visa-kreditkarte"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jetzt beantragen
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center space-x-2">
          <i aria-hidden="true" className="fa fa-shopping-bag"></i>
          <span>+</span>
          <i aria-hidden="true" className="fa fa-money"></i>
          <span>Gratis Bezahlen und Abheben weltweit</span>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <img
              className="w-48 object-contain"
              src="https://produkte.dkb.de/images/packshot-3d.png"
              alt="DKB"
            />
            <div>
              <CardTitle className="mb-4">DKB Visa Girokonto</CardTitle>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-green-600 mt-1"></i>
                  <span><strong>0€</strong> Gebühren fürs Konto</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-green-600 mt-1"></i>
                  <span><strong>0€</strong> für Abhebungen weltweit</span>
                </li>
                <li className="flex items-start space-x-2">
                  <i className="fa fa-check-square text-blue-600 mt-1"></i>
                  <span>inkl. Girokonto und girocard</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <Button asChild>
              <a
                href="https://financeads.net/tc.php?t=39323C10310001B"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jetzt beantragen
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Worldwide;
