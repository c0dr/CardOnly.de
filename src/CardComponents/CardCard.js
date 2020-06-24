import React, { Component } from 'react';
import { Table, Card, CardTitle, CardBody, CardText, Button, ButtonGroup, CardSubtitle, UncontrolledCollapse } from 'reactstrap';

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
      <Card style={{marginBottom: '1rem'}}>
        <CardBody>
          <CardTitle>{this.props.card.Issuer}</CardTitle>
          <CardText>{this.props.card.yearlyFee}€/Jahr</CardText>
          <ul>
          <li><CardText>Abhebungen Eurozone {this.props.card.fees_atm_eur}</CardText></li>
          <li><CardText>Abhebungen Ausland {this.props.card.fees_atm_foreign}</CardText></li>
          <li><CardText>POS Ausland {this.props.card.fees_pos_foreign}</CardText></li>
          </ul>
          <ButtonGroup>
          <Button color="success" href={this.props.card.link} target="_blank" rel="noopener noreferrer" >Jetzt beantragen</Button>
          <Button color="primary" id={'card' + this.props.index}>Details</Button>
          </ButtonGroup>
          <UncontrolledCollapse toggler={'#card' + this.props.index}>
            <CardText> <span key={this.props.index}>
              <Table bordered striped>
                <tbody>
                  {this.props.cols.map((col, index) => {
                    return (
                      <tr>
                        <td>{col.label}</td>
                        <td><span key={index} dangerouslySetInnerHTML={{ __html: this.generateTemplate(this.props.card[col.value]) }}></span></td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </span>
            </CardText>
          </UncontrolledCollapse>
        </CardBody>
      </Card>)
  }
}

export default CardCard;
