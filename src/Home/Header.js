import React, { Component } from 'react';
import {   
  Button, ButtonGroup
 } from 'reactstrap';


class Header extends Component {

  

    freeAtm = () => {
      this.props.filterChange("freeATM", ["fees_atm_foreign"])
    }

    miles = () => {
      this.props.filterChange("miles", true)
    }

    applePay = () => {
      this.props.filterChange("applePay", true)
    }
  
  render() {
    return (
      <div className="well">
        <h1>
          Finde jetzt die richtige Karte </h1>
          <p>Egal ob Reise, Meilen oder Bargeld abheben, schnell zur passenden Karte für dich!</p>
      <Button onClick={this.freeAtm} color="success">Weltweit kostenlos abheben</Button>
      <Button onClick={this.miles} color="success">Meilen sammeln</Button>
      <Button onClick={this.applePay} color="success">Apple Pay</Button>
      </div>
    );
  }
}

export default Header;
