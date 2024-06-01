import React, { Component } from 'react';
import { Table, Card, CardTitle, CardBody, CardText, Button, ButtonGroup, UncontrolledCollapse, Row, Col, Container } from 'reactstrap';
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
          <Container fluid>
            <Row>
              <Col sm="2">
          <img alt="Bild der Karte" className='cardimg' src={this.props.card.image}/>
          </Col>
        <Col sm="10">
          <ul style={{listStyle: 'none'}} className='features features-padding'>
          
          <li><strong>Jahresgebühr </strong> <FeeLabel value={this.props.card.yearlyFee} euro={true}/></li>
          <li><strong>Abhebungen </strong> <WorldWideFeeLabel eur={this.props.card.fees_atm_eur} foreign={this.props.card.fees_atm_foreign}/></li>
          <li><strong>Fremdwährung </strong><FeeLabel value={this.props.card.fees_pos_foreign}/></li>
          <li><strong>Offline-PIN </strong><span dangerouslySetInnerHTML={{__html:this.generateTemplate(this.props.card.offlinepin)}}></span></li>
          </ul>
          </Col>
          </Row>
          </Container>
          <ul style={{listStyle: 'none'}} className='features'>

          <li><CurrentAccount card={this.props.card}/></li>
          <li><span dangerouslySetInnerHTML={{__html:this.generateTemplate(this.props.card.notes)}}></span></li>
          <li style={{fontSize: '12px'}}><span dangerouslySetInnerHTML={{__html:this.generateTemplate(this.props.card.legalnotes)}}></span></li>
          <li> <ApplePay card={this.props.card}/>
          <GooglePay card={this.props.card}/>
          <Contactless card={this.props.card}/></li>
          </ul>
          <ButtonGroup>
            {(() => {
              if(this.props.card.adlink) {
                return ([
                  <Button color="success" href={this.props.card.adlink} target="_blank" rel="noopener noreferrer" >Beantragen und CardOnly.de unterstützen*</Button>,
                  <Button color="primary" href={this.props.card.link} target="_blank" rel="noopener noreferrer" >Direkt beantragen</Button>])
              } else if(this.props.card.link) {
                return <Button color="success" href={this.props.card.link} target="_blank" rel="noopener noreferrer" >Jetzt direkt beantragen</Button>
              }
            })()}
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
