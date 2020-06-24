import React, { Component } from 'react';
import { Table, Card, CardTitle, CardBody, CardText, Button, ButtonGroup, CardSubtitle, UncontrolledCollapse } from 'reactstrap';
import ApplePay from './ApplePay';
import GooglePay from './GooglePay';
import FeeLabel from './FeeLabel';
import CurrentAccount from './CurrentAccount';
import WorldWideFeeLabel from './WorldWideFeeLabel';
import Contactless from './Contactless';


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
          <ul style={{listStyle: 'none'}}>
          <li><strong>Jahresgebühr </strong> <FeeLabel value={this.props.card.yearlyFee} euro={true}/></li>
          <li><strong>Abhebungen </strong> <WorldWideFeeLabel eur={this.props.card.fees_atm_eur} foreign={this.props.card.fees_atm_foreign}/></li>
          <li><strong>Fremdwährung </strong><FeeLabel value={this.props.card.fees_pos_foreign}/></li>
          <li><strong>Offline-PIN </strong><span dangerouslySetInnerHTML={{__html:this.generateTemplate(this.props.card.offlinepin)}}></span></li>
          <li><CurrentAccount card={this.props.card}/></li>
          <li> <ApplePay card={this.props.card}/>
          <GooglePay card={this.props.card}/>
          <Contactless card={this.props.card}/></li>

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
