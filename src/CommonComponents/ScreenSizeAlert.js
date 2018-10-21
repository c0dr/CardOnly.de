
import React from 'react';
import {   
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Alert,
   } from 'reactstrap';

export default class ScreenSizeAlert extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
         <Modal isOpen={this.state.modal} toggle={this.toggle} wrapClassName="screenSizeAlert">
          <ModalHeader toggle={this.toggle}>Bildschrimgröße</ModalHeader>
          <ModalBody>
            <Alert color="warning">
              <p>Vielen Dank für Ihr Interesse an dem umfangreichen Kreditkartenvergleich von CardOnly.de</p>
              <p>Für das bessere Benutzererlebnis empfehlen wir den Besuch mit einem großen Bildschirm.</p>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
