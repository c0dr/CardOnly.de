import React, { Component } from 'react';
import { Jumbotron, Row, Container } from 'reactstrap';
import CardCard from '../CardComponents/CardCard';



class Recommended extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
    this.allowedIssuers = ["N26", "Revolut Premium MasterCard", "Monese Simple Debit MasterCard", "Consorsfinanz EC Debit MasterCard", "bunq Premium", "Transferwise Debit MasterCard", "Bitwala", "Openbank Girokonto ohne Travel-Abo"]
  }

  componentDidMount() {
    fetch('data/cards.json')
      .then(response => response.json())
      .catch(console.log)
      .then(cards => cards.filter(card => this.allowedIssuers.indexOf(card.Issuer) !== -1))
      .then(data => this.setState({ cards: data }))

  }


  render() {
    return (
      <>
      <Jumbotron style={{ 
        backgroundImage: `url(https://images.unsplash.com/photo-1554774853-b415df9eeb92?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`, 
        backgroundSize: 'cover',
        borderRadius: 'none',
        marginBottom: '0' }}>
      <h2 style={{color: '#fefefe', paddingTop: '25rem'}}>Jetzt eine Debit MasterCard (ec-Karte) holen</h2>
      <h3 style={{color: '#fefefe'}}>Egal ob Online shoppen oder stationär - jetzt ist alles möglich</h3>
      </Jumbotron>

    <Jumbotron style={{ 
      backgroundColor: '#2c3e50', 
      borderRadius: 'none',
      textAlign: 'center' }}>
    <h4 style={{color: '#fefefe'}}>Viele deutsche Banken bieten schon eine praktische DMC an. Unsere Empfehlungen:</h4>

    <Container>
        <Row>

    {this.state.cards.map((card, index) => {
            return (<CardCard card={card} index={index} cols={[]}/>);
          })}
          </Row>
          </Container>
    </Jumbotron>

        </>
    );
  }
}

export default Recommended;
