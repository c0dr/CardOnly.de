import React, { Component } from 'react';
import CardCard from './CardCard';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Info } from 'lucide-react';

class CardComponents extends Component {

  render() {
    return (
      <div>
          <h4>{this.props.cards.length} Karten</h4>
          <Alert className="mb-6">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
                Bei Eröffnung über unsere markierten Links erhalten wir eventuell eine Provision vom Anbieter, die es dabei unterstützt, diese Seite aktiv zu pflegen. Im Gegensatz zu anderen Anbietern nehmen wir aber alle Karten in den Vergleich mit auf, egal ob sie uns Provision zahlen oder nicht! Das Ranking ist von der Provision nicht beeinflusst. Ihr könnt auch direkt zum Anbieter ohne unsere Links über den anderen Button.
              </AlertDescription>
          </Alert>

          {this.props.cards.map((card, index) => {
            return (<CardCard card={card} index={index} cols={this.props.cols} />);
          })}
      </div>
    );
  }
}

export default CardComponents;
