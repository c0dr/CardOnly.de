import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Germany from './Germany';
import Worldwide from './Worldwide';



class Recommended extends Component {
  render() {
    return (
      <Container>
        <h2>Unsere Kreditkartenempfehlungen</h2>
        <p>Wir empfehlen folgende Karten. Die Auswahl wurde unabhängig von den Provisionen getroffen, die die Anbieter uns bei Eröffnung zahlen. Diese Produkte sind kostenlos und lohnen sich durch ihre Konditionen.</p>
        <Row offset="3">
          <Col>
            <Germany />
          </Col>
          <Col>
            <Worldwide />
          </Col>
        </Row>
        <p>Kostenlos im Sinne von unmittelbar anfallender Gebühren. Es können teils Zisen entstehen.</p>
      </Container>
    );
  }
}

export default Recommended;
