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
        return '<span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800"><i class="fa fa-check fa-fw"></i></span>';
      } else {
        return '<span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800"><i class="fa fa-times fa-fw"></i></span>';
      }
    } else {
      return value;
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{card.Issuer}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/6">
            <img alt="Bild der Karte" className="w-full max-w-[10rem]" src={card.image}/>
          </div>
          <div className="w-full sm:w-5/6">
            <ul className="list-none space-y-2">
              <li><span className="font-bold">Jahresgebühr </span> <FeeLabel value={card.yearlyFee} euro={true}/></li>
              <li><span className="font-bold">Abhebungen </span> <WorldWideFeeLabel eur={card.fees_atm_eur} foreign={card.fees_atm_foreign}/></li>
              <li><span className="font-bold">Fremdwährung </span><FeeLabel value={card.fees_pos_foreign}/></li>
              <li><span className="font-bold">Offline-PIN </span><span dangerouslySetInnerHTML={{__html: generateTemplate(card.offlinepin)}}></span></li>
            </ul>
          </div>
        </div>
        
        <ul className="list-none space-y-2 mt-4">
          <li><CurrentAccount card={card}/></li>
          <li><span dangerouslySetInnerHTML={{__html: generateTemplate(card.notes)}}></span></li>
          <li className="text-xs"><span dangerouslySetInnerHTML={{__html: generateTemplate(card.legalnotes)}}></span></li>
          <li className="flex gap-2">
            <ApplePay card={card}/>
            <GooglePay card={card}/>
            <Contactless card={card}/>
          </li>
        </ul>

        <div className="flex flex-wrap gap-2 mt-4">
          {card.adlink ? (
            <>
              <Button asChild variant="default">
                <a href={card.adlink} target="_blank" rel="noopener noreferrer">
                  Beantragen und CardOnly.de unterstützen*
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={card.link} target="_blank" rel="noopener noreferrer">
                  Direkt beantragen
                </a>
              </Button>
            </>
          ) : card.link ? (
            <Button asChild variant="default">
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                Jetzt direkt beantragen
              </a>
            </Button>
          ) : null}
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline">Details</Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Table>
                <TableBody>
                  {cols.map((col, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{col.label}</TableCell>
                      <TableCell>
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
