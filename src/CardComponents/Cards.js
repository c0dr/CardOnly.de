import React, { Component } from 'react';
import CardCard from './CardCard';
import CardsTable from './CardsTable';

class CardComponents extends Component {

  render() {
    return (
      <div>
        {/* On mobile, show the cards as individual cards. */}
        <div className="d-block d-sm-none">
          <h4>Karten</h4>
          {this.props.cards.map((card, index) => {
            return (<CardCard card={card} index={index} cols={this.props.cols} />);
          })}
        </div>

        {/* On desktop, show a table */}
        <div className="d-none d-sm-block">
          <CardsTable {...this.props} />
        </div>
      </div>
    );
  }
}

export default CardComponents;
