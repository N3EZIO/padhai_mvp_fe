import React from "react";
import { useNavigate } from "react-router-dom";

import "./navbar.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
// import {Auth0Provider} from '../../containers/Auth0/Authent'
import { Auth0Provider } from "@auth0/auth0-react";

import { useAuth0 } from "@auth0/auth0-react";

const NavbarHome = () => {
  const navigate = useNavigate();
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Padh.ai</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link href="aboutus">About Us</Nav.Link>
            <Nav.Link href="vision">Our Vision</Nav.Link>
            <NavDropdown title="More ..." id="basic-nav-dropdown">
              <NavDropdown.Item href="aboutus">About Us</NavDropdown.Item>
              <NavDropdown.Item href="vision">Our Vision</NavDropdown.Item>
              <NavDropdown.Item href="goals">
                Future Endeavours
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="contactus">Contact Us</NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
          {!isAuthenticated ? (
            <Button variant="outline-success" onClick={() => loginWithPopup()}>
              Login
            </Button>
          ) : (
            <Button variant="outline-success" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHome;
