import React, { Component } from 'react';
import ContactlessImage from '../img/contactless.svg'
class Contactless extends Component {

  generateHtml() {
    if(this.props.card.contactless) {
      return <img width="25px" src={ContactlessImage}/>;
    } else {
      return null;
    }
  }
  render() {
    return this.generateHtml()
  }
}

export default Contactless;
