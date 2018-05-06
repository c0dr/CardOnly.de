import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Filter extends Component {

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
      <div>
        <div className="well">
          <h2>
            <i className="fa fa-credit-card"></i>
            Egal ob Supermarkt in Köln, U-Bahn in London oder Geldautomat in NYC</h2>
          <h4>Habe immer gute Karten mit unserem Kreditkartenvergleich</h4>
        </div>
        <Table bordered striped>
          <thead>
            <tr>
              {this.props.cols.map(col => {
                return <th>{col.label}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.cards.map(card => {
              return <tr>
                {this.props.cols.map(col => {
                  return <td dangerouslySetInnerHTML={{ __html: this.generateTemplate(card[col.value]) }}></td>
                })}
              </tr>
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Filter;
