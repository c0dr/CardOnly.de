import React, { Component } from 'react';
import { Card, CardTitle, CardHeader, CardBody, CardText, Button } from 'reactstrap';
import Advanzia from '../img/advanzia.gif';
import Barclaycard from '../img/barclaycard.png';

class Worldwide extends Component {
  render() {
    return (
      <div>
        <h3>Die Kombi für Reisende</h3>
        <Card>
          <CardHeader><i aria-hidden="true" className="fa fa-shopping-bag"></i> + <i aria-hidden="true" className="fa fa-money"></i> Gratis Bezahlen und Abheben weltweit</CardHeader>
          <CardBody>
            <img className="cardImg" src={Barclaycard} alt="Barclaycard" />
            <CardTitle>Barclaycard Visa</CardTitle>
            <CardText>
            <ul className="fa-ul" style={{ display: 'inline-block' }}>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€ </strong> Jahresgebühr</li>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€ </strong> für Abhebungen weltweit</li>
              <li><i className="fa-li fa fa-check-square text-success"></i>100% Lastschrift einstellbar</li>
            </ul>
            </CardText>
          </CardBody>
          <Button color="success" href="https://www.barclaycard.de/kreditkarten/visa-kreditkarte">Jetzt beantragen</Button>
        </Card>
        <Card>
          <CardHeader><i aria-hidden="true" className="fa fa-shopping-bag"></i> + <i aria-hidden="true" className="fa fa-money"></i> Gratis Bezahlen und Abheben weltweit</CardHeader>
          <CardBody>
            <img className="cardImg" src="https://produkte.dkb.de/images/packshot-3d.png" alt="DKB" />
            <CardTitle>DKB Visa Girokonto</CardTitle>
            <CardText>
            <ul className="fa-ul" style={{ display: 'inline-block' }}>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€ </strong> Gebühren fürs Konto</li>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€ </strong> für Abhebungen weltweit</li>
              <li><i className="fa-li fa fa-check-square text-info"></i>inkl. Girokonto und girocard</li>
            </ul>
            </CardText>

          </CardBody>
          <Button color="success" href="https://financeads.net/tc.php?t=39323C10310001B">Jetzt beantragen</Button>
        </Card>
      </div>
    );
  }
}

export default Worldwide;
