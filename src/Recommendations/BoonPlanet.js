import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Germany from './Germany';
import Worldwide from './Worldwide';
import { Card, CardTitle, CardHeader, CardBody, Button } from 'reactstrap';



class Recommended extends Component {
  render() {
    return (
      <Container>
                <Row>
          <Col  xs={{size: 6, offset: 3}}>


        <h2>Ersatz für boon.PLANET</h2>
        <p> Nach Anmeldung der Insolvez der Wirecard AG, der Holding der Wirecard Bank AG, die noch keine Insolvenz angemeldet hat, bleibt für Kunden von boon.PLANET die Frage,
          wo in der Zukunft ein Konto geführt wird. </p>
          <p>Die Einlagen sind bei boon.PLANET gesetzlich geschützt, die Zukunft des Kontos aber vollkommen unklar.</p> 
          <p>Wir suchen nach Banken mit folgenden Features:
          <ul>
            <li>Debitkarte (Mastercard oder Visa)</li>
            <li>Deutsche IBAN</li>
            <li>Einlagensicherung</li>
            <li>Keine Gebühren für Fremdwährung</li>
            <li>ATM kostengünstig</li>
          </ul>
          </p>

          <h2>Erster Kandidat: N26</h2>

      <Card>
          <CardHeader><i aria-hidden="true" className="fa fa-shopping-bag"></i> + <i aria-hidden="true" className="fa fa-money"></i> Konto mit guter App und Debitkarte</CardHeader>
          <CardBody>
            <img className="cardImg" src="https://images.ctfassets.net/q33z48p65a6w/2DqC4xSMtayA6kmOo64I0E/18fd114ab3cf1ba654e5b4c203ebc461/n26-cards-mastercard-de.png?fit=thumb&fm=png&q=90&w=320" alt="Barclaycard Visa" />
            <CardTitle>N26 Konto</CardTitle>
            <ul className="fa-ul" style={{ display: 'inline-block' }}>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€</strong> Kontoführung und <strong> 0€&nbsp; Abhebungen in Eurozone</strong></li>
              <li><i className="fa-li fa fa-check-square text-success"></i>Gute App, Debit MC</li>
              <li><i className="fa-li fa fa-check-square text-warn"></i>Mit Schufa</li>
            </ul>
          </CardBody>
          <Button color="success" target="_blank" rel="noopener noreferrer" href="https://n26.com/en-de/bank-account">Jetzt beantragen</Button>
        </Card>
        
        <p> Der offensichtliche Kandidat ist N26. Mit der Debit Mastercard kann weltweit kostenlos bezahlt werden, die Karte unterstützt wie boon.PLANET Offline-PIN, 201 Service Code und Wunschpin. </p>
        <p>  Bis zu 5 Abhebungen sind in Deutschland pro Monat kostenlos, im Ausland fallen 1.75% an. Die App liefert schnelle Pushs bei Zahlungen. </p>
        <p> Allerdings arbeitetet N26 mit der Schufa zusammen, was das Konto als Drittkonto wenig attraktiv macht </p>

          <h2>Moneyou Go</h2>

           <Card>
          <CardHeader><i aria-hidden="true" className="fa fa-shopping-bag"></i> + <i aria-hidden="true" className="fa fa-money"></i> Konto mit App und ohne Schufa</CardHeader>
          <CardBody>
            <img className="cardImg" src="https://www.moneyou.de/-/media/MoneYou-DE/go/web/girokonto/20200512-DE-Card-Plain-90-2.png?h=627&w=1199&la=de-DE&hash=9833501B2B4BE5C99593502D78B863F913980B2C" alt="Barclaycard Visa" />
            <CardTitle>Moneyou Go</CardTitle>
            <ul className="fa-ul" style={{ display: 'inline-block' }}>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€</strong> Kontoführung und <strong> 0€&nbsp; Abhebungen in Eurozone</strong></li>
              <li><i className="fa-li fa fa-check-square text-success"></i>Gute App, Debit MC</li>
              <li><i className="fa-li fa fa-check-square text-success"></i>Ohne Schufa</li>
            </ul>
          </CardBody>
          <Button color="success" target="_blank" rel="noopener noreferrer" href="https://www.moneyou.de/girokonto">Jetzt beantragen</Button>
        </Card>

        <p>Ohne Schufa ist Moneyou Go unterwegs. </p> <p>Das deutsche Angebot der ABN AMRO bietet ein schlichtes Konto per App mit Debit MasterCard. </p>
        <p>In der Eurozone sind 2 Abhebungen kostenlos, danach 2 Euro. Im Ausland fallen 1.75% am POS und am ATM an. </p>
        <p> Die Karte bietet Offline-PIN, allerdings nur einen 221 Service Code.
           Insgesamt ein solides Produkt.
           </p>


  <h2>Bitwala</h2>

<Card>
<CardHeader><i aria-hidden="true" className="fa fa-shopping-bag"></i> + <i aria-hidden="true" className="fa fa-money"></i> Konto mit App und ohne Schufa</CardHeader>
<CardBody>
 <img className="cardImg" src="https://www.bitwala.com/static/bankaccount_intext_card-1cdd5b353c6355bfebbb80bc3c4cfb37.png" alt="Barclaycard Visa" />
 <CardTitle>Bitwala</CardTitle>
 <ul className="fa-ul" style={{ display: 'inline-block' }}>
   <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€</strong> Kontoführung und <strong> 0€&nbsp; Abhebungen weltweit</strong></li>
   <li><i className="fa-li fa fa-check-square text-success"></i>Mäßige App, Debit MC</li>
   <li><i className="fa-li fa fa-check-square text-success"></i>Ohne Schufa</li>
 </ul>
</CardBody>
<Button color="success" target="_blank" rel="noopener noreferrer" href="https://www.bitwala.com/bank-account/">Jetzt beantragen</Button>
</Card>

<p>Zusammen mit der solarisBank bietet die Cryptobörse Bitwala ein kostenloses Girokonto an. Abhebungen sind weltweit kostenlos, Gebühren fallen auch am POS keine an. </p><p>Die Debit MasterCard kann Offline-PIN, aber nur einen 221 Service Code.
  Die Kontoauszüge sind leider wenig aussagekräftig, als Empfänger steht nur "MasterCard" statt dem richtigen Händler.
  Bitwala arbeitet derzeit nicht mit der Schufa zusammen.
</p>

 <h2>Weitere solarisBank Produkte</h2>

<p>Als weitere Produkte mit der solarisBank gibt es vivid und Tomorrow mit relativ ähnlichen Konditionen.
</p>

<h3>Die Liste wird koninuierlich erweitert. </h3>
</Col>
</Row>
      </Container>
    );
  }
}

export default Recommended;
