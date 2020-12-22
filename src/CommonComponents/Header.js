import React from 'react';
import {   
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Collapse
   } from 'reactstrap';
import {Link} from 'react-router-dom';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
      }
    
      toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="md"> 
          <NavbarBrand tag={Link} to="/">CardOnly.de</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>

              <ul className="navbar-nav"><li className="nav-item"><a className="nav-link" target="_blank" rel="noreferrer" href="https://blog.cardonly.de">Blog</a></li></ul>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/contact">Kontakt</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
