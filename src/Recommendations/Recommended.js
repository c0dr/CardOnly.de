import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Germany from './Germany';
import Worldwide from './Worldwide';



class Recommended extends Component {
  render() {
    return (
      <Container>
        <h2>Unsere Kreditkartenempfehlungen</h2>
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
