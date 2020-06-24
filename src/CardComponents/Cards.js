import React, { Component } from 'react';
import CardCard from './CardCard';
import CardsTable from './CardsTable';

class CardComponents extends Component {

  render() {
    return (
      <div>
          <h4>{this.props.cards.length} Karten</h4>
          {this.props.cards.map((card, index) => {
            return (<CardCard card={card} index={index} cols={this.props.cols} />);
          })}
      </div>
    );
  }
}

export default CardComponents;
