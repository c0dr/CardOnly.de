import React, { Component } from 'react';
import CardCard from './CardCard';

class CardComponents extends Component {

  render() {
    return (
      <div>
          <h4>{this.props.cards.length} Karten</h4>
          <p>*Bei Eröffnung über unsere Links erhalten wir eventuell eine Provision vom Anbieter, die es dabei unterstützt, diese Seite aktiv zu pflegen. Im Gegensatz zu anderen Anbietern nehmen wir aber alle Karten in den Vergleich mit auf, egal ob sie uns Provision zahlen oder nicht! Das Ranking ist von der Provision nicht beeinflusst.</p>

          {this.props.cards.map((card, index) => {
            return (<CardCard card={card} index={index} cols={this.props.cols} />);
          })}
      </div>
    );
  }
}

export default CardComponents;
