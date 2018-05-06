import React, { Component } from 'react';
import { Card, CardTitle, CardHeader, CardBody } from 'reactstrap';


class Worldwide extends Component {
  render() {
    return (
      <div>
        <h3>Die Kombi für Reisende</h3>
        <Card>
          <CardHeader><i aria-hidden="true" className="fa fa-shopping-bag"></i> + <i aria-hidden="true" className="fa fa-money"></i> Gratis Bezahlen und Abheben weltweit</CardHeader>
          <CardBody>
            <img className="cardImg" src="https://i.imgur.com/ayft08o.gif" alt="Barclaycard New Visa" />
            <CardTitle>Advanzia Gold</CardTitle>
            <ul className="fa-ul" style={{ display: 'inline-block' }}>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€ </strong> Jahresgebühr</li>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€ </strong> für Abhebungen weltweit</li>
              <li><i className="fa-li fa fa-check-square text-danger"></i>Abhebungen sofort verzinst</li>
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><i aria-hidden="true" className="fa fa-shopping-bag"></i> + <i aria-hidden="true" className="fa fa-money"></i> Gratis Bezahlen und Abheben weltweit</CardHeader>
          <CardBody>
            <img className="cardImg" src="http://i.imgur.com/zr7aYbJ.png" alt="Santander 1plus" />
            <CardTitle>Santander 1plus</CardTitle>
            <ul className="fa-ul" style={{ display: 'inline-block' }}>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€ </strong> Jahresgebühr dauerhaft</li>
              <li><i className="fa-li fa fa-check-square text-success"></i><strong>0€</strong> Gebühren für Einsatz weltweit</li>
              <li><i className="fa-li fa fa-check-square text-success"></i>Erstattung von ATM-Gebühren (einzigartig!)</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Worldwide;
