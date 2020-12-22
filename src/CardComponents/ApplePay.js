import React, { Component } from 'react';
import ApplePayImg from '../img/applepay.svg'
class ApplePay extends Component {

  generateHtml() {
    if(this.props.card.applepay) {
      return <img width="50px" alt="Apple Pay logo" src={ApplePayImg}/>;
    } else {
      return null;
    }
  }
  render() {
    return this.generateHtml()
  }
}

export default ApplePay;
