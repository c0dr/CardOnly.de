import React, { Component } from 'react';
import CardCard from './CardCard';
import CardsTable from './CardsTable';

class CardComponents extends Component {

  render() {
    return (
      <div>
          <h4>{this.props.cards.length} Karten</h4>
          <p>*Bei Eröffnung über unsere markierten Links erhalten wir eventuell eine Provision vom Anbieter, die es dabei unterstützt, diese Seite aktiv zu pflegen. Im Gegensatz zu anderen Anbietern nehmen wir aber alle Karten in den Vergleich mit auf, egal ob sie uns Provision zahlen oder nicht! Das Ranking ist von der Provision nicht beeinflusst.
          Ihr könnt auch direkt zum Anbieter ohne unsere Links über den anderen Button</p>

          {this.props.cards.map((card, index) => {
            return (<CardCard card={card} index={index} cols={this.props.cols} />);
          })}
      </div>
    );
  }
}

export default CardComponents;
