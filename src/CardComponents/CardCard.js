import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../components/ui/collapsible';
import { Table, TableBody, TableRow, TableCell } from '../components/ui/table';
import ApplePay from './ApplePay';
import GooglePay from './GooglePay';
import FeeLabel from './FeeLabel';
import CurrentAccount from './CurrentAccount';
import WorldWideFeeLabel from './WorldWideFeeLabel';
import Contactless from './Contactless';

const CardCard = ({ card, cols, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const generateTemplate = (value) => {
    if (typeof value === 'boolean') {
      if (value === true) {
        return '<span class="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:text-green-200"><i class="fa fa-check fa-fw"></i></span>';
      } else {
        return '<span class="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:text-red-200"><i class="fa fa-times fa-fw"></i></span>';
      }
    } else {
      return value;
    }
  };

  return (
    <Card className="mb-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{card.Issuer}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/6 flex justify-center">
            <div className="relative w-full max-w-[10rem] aspect-[1.586/1]">
              <img 
                alt="Bild der Karte" 
                className="absolute inset-0 w-full h-full object-contain rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" 
                src={card.image}
              />
            </div>
          </div>
          <div className="w-full sm:w-5/6">
            <ul className="list-none space-y-3">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Jahresgebühr</span>
                <FeeLabel value={card.yearlyFee} euro={true}/>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Abhebungen</span>
                <WorldWideFeeLabel eur={card.fees_atm_eur} foreign={card.fees_atm_foreign}/>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Fremdwährung</span>
                <FeeLabel value={card.fees_pos_foreign}/>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Offline-PIN</span>
                <span dangerouslySetInnerHTML={{__html: generateTemplate(card.offlinepin)}}></span>
              </li>
            </ul>
          </div>
        </div>
        
        <ul className="list-none space-y-3 mt-6">
          <li><CurrentAccount card={card}/></li>
          <li><span dangerouslySetInnerHTML={{__html: generateTemplate(card.notes)}}></span></li>
          <li className="text-xs text-gray-500 dark:text-gray-400"><span dangerouslySetInnerHTML={{__html: generateTemplate(card.legalnotes)}}></span></li>
          <li className="flex gap-3">
            <ApplePay card={card}/>
            <GooglePay card={card}/>
            <Contactless card={card}/>
          </li>
        </ul>

        <div className="flex flex-wrap gap-3 mt-6">
          {card.adlink ? (
            <>
              <Button 
                asChild 
                variant="default"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                <a href={card.adlink} target="_blank" rel="noopener noreferrer">
                  Beantragen und CardOnly.de unterstützen*
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline"
                className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <a href={card.link} target="_blank" rel="noopener noreferrer">
                  Direkt beantragen
                </a>
              </Button>
            </>
          ) : card.link ? (
            <Button 
              asChild 
              variant="default"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                Jetzt direkt beantragen
              </a>
            </Button>
          ) : null}
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline"
                className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                Details
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Table className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <TableBody>
                  {cols.map((col, idx) => (
                    <TableRow key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                      <TableCell className="font-medium text-gray-700 dark:text-gray-300">{col.label}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">
                        <span dangerouslySetInnerHTML={{ __html: generateTemplate(card[col.value]) }}></span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardCard;
