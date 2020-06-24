import React, { Component } from 'react';

class CurrentAccount extends Component {

  generateHtml() {
    if(this.props.card.withChecking) {
      return <div className="text-muted">Mit Girokonto</div>
    } else {
      return <div className="text-muted">Ohne Girokonto</div>
    }
  }
  render() {
    return this.generateHtml()
  }
}

export default CurrentAccount;
