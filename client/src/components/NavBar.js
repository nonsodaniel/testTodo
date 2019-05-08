import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";

class NavBar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: true });
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand>Shopping List</NavbarBrand>
            <NavbarToggler onClick={this.toggle}>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="github.com">github</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </NavbarToggler>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
