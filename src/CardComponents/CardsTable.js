import React, { Component } from 'react';
import { Table } from 'reactstrap';

class CardCard extends Component {

  generateTemplate(value) {
    if (typeof value === 'boolean') {
      if (value === true) {
        return '<span class="badge badge-success"><i class="fa fa-check fa-fw "></i></span>';
      } else {
        return '<span class="badge badge-info"><i class="fa fa-times fa-fw"></i></span>'
      }
    } else {
      return value;
    }
  }

  render() {
    return (
      <Table bordered striped>
        <thead>
          <tr>
            {this.props.cols.map((col, index) => {
              return <th key={index}>{col.label}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {this.props.cards.map((card, index) => {
            return <tr key={index}>
              <td key={index}><a href={card.link}>{card.Issuer}</a></td>
              {this.props.cols.slice(1).map((col, index) => {
                return <td key={index} dangerouslySetInnerHTML={{ __html: this.generateTemplate(card[col.value]) }}></td>
              })}
            </tr>
          })}
        </tbody>
      </Table>
    )
  }
}

export default CardCard;
