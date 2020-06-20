import React, { Component } from 'react';
import { Card, CardTitle, CardHeader, CardBody } from 'reactstrap';
import Advanzia from '../img/advanzia.gif';
import Santander from '../img/santander.png';

class Worldwide extends Component {
  render() {
    return (
      <div>
        <h3>Die Kombi für Reisende</h3>
        <Card>
          <CardHeader><i aria-hidden="true" className="fa fa-shopping-bag"></i> + <i aria-hidden="true" className="fa fa-money"></i> Gratis Bezahlen und Abheben weltweit</CardHeader>
          <CardBody>
            <img className="cardImg" src={Advanzia} alt="Advanzia" />
            <CardTitle>Advanzia Gold</CardTitle>
            <ul className="fa-ul" style={{ display: 'inline-block' }}>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€ </strong> Jahresgebühr</li>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€ </strong> für Abhebungen weltweit</li>
              <li><i className="fa-li fa fa-check-square text-danger"></i>Abhebungen sofort verzinst</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Worldwide;
