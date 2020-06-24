import React, { Component } from 'react';
class FeeLabel extends Component {

  returnLabel(value, euro) {
    if(value == 0) {
      return <strong className="text-success">Kostenlos</strong>;
    } else {
      return <span className="text-muted">{value}{euro ? '€' : ''}</span>;
    }
  }
  render() {
    return this.returnLabel(this.props.value, this.props.euro)
  }
}

export default FeeLabel;
