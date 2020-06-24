import React, { Component } from 'react';
import GooglePayImg from '../img/googlepay.svg'
class GooglePay extends Component {

  generateHtml() {
    if(this.props.card.googlepay) {
      return <img width="50px" src={GooglePayImg}/>;
    } else {
      return null;
    }
  }
  render() {
    return this.generateHtml()
  }
}

export default GooglePay;
