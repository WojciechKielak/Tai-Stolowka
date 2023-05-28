import React, {Component, useContext} from "react";
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductCustomer } from "../contexAPI";
import AuthContext from "../Context/AuthContext";

export default class Nab extends Component{
    static contextType = AuthContext;

    render() {
        const {logout} = this.context;
        return (
            <div>
                <Navbar collapseOnSelect expand = "lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#">Stołówka Szkolna</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Link to='/'>Produkty</Link>
                        </Nav>
                        <Nav >
                        <Link style={{color:"mediumspringgreen"}} eventKey={2} to="/cart" className="justify-content-end">
                                    Koszyk()
                        </Link>
                        </Nav>
                        <Nav >
                        <p onClick={logout} style={{ color: "red" }}>Wyloguj</p>
                        </Nav>
                    </Navbar.Collapse>  
                </Navbar>
            </div>
        )
    }
}