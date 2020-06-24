import React, { Component } from 'react';
import { Card, CardTitle, CardHeader, CardBody, Button } from 'reactstrap';
import Barclaycard from '../img/barclaycard.png';
import Amex from '../img/amex.png';

class Germany extends Component {
  render() {
    return (
      <div>
        <h3>Die Kombi für Deutschland</h3>
        <Card>
          <CardHeader><i aria-hidden="true" className="fa fa-shopping-bag"></i> + <i aria-hidden="true" className="fa fa-money"></i> Gratis Bezahlen und Abheben</CardHeader>
          <CardBody>
            <img className="cardImg" src={Barclaycard} alt="Barclaycard Visa" />
            <CardTitle>Barclaycard Visa</CardTitle>
            <ul className="fa-ul" style={{ display: 'inline-block' }}>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€</strong> Jahresgebühr und <strong> 0€&nbsp; Abhebungen</strong></li>
              <li><i className="fa-li fa fa-check-square text-success"></i>Langes Zahlungsziel, hohes Limit erreichbar</li>
              <li><i className="fa-li fa fa-check-square text-info"></i>100% Lastschrift einstellbar</li>
            </ul>
          </CardBody>
          <Button color="success" href="https://www.barclaycard.de/kreditkarten/visa-kreditkarte">Jetzt beantragen</Button>
        </Card>
        <Card>
          <CardHeader><i aria-hidden="true" className="fa fa-shopping-bag"></i> Gratis Punkte sammeln in Europa</CardHeader>
          <CardBody>
            <img className="cardImg" src={Amex} alt="American Express Payback" />
            <CardTitle>American Express Payback</CardTitle>
            <ul className="fa-ul" style={{ display: 'inline-block' }}>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€ </strong> Jahresgebühr dauerhaft</li>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>1 Payback Punkt pro 2 Euro</strong></li>
              <li><i className="fa-li fa fa-check-square text-info"></i>2% bei Zahlung in Fremdwährung</li>
            </ul>
          </CardBody>
          <Button color="success" href="http://barclaycard.de">Jetzt beantragen</Button>

        </Card>
      </div>
    );
  }
}

export default Germany;
