import React, { Component } from 'react';
class WorldWideFeeLabel extends Component {

  returnLabel() {
    if(this.props.foreign === 0) {
      return <strong className="text-success">Weltweit kostenlos</strong>;
    } else if (this.props.eur === 0){
      return <span className="text-warn">Im Euroraum kostenlos</span>;
    } else {
      return <span className="text-muted">Euro: {this.props.eur}, weltweit {this.props.foreign}</span>
    }
  }
  render() {
    return this.returnLabel(this.props.value)
  }
}

export default WorldWideFeeLabel;
