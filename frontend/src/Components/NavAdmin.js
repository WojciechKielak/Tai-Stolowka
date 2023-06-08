import React, {Component, useContext} from "react";
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductCustomer } from "../contexAPI";
import AuthContext from "../Context/AuthContext";

export default class NavAdmin extends Component{
    static contextType = AuthContext;

    render() {
        const {logout} = this.context;
        return (
            <div>
               <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'mediumspringgreen' }}>
                    <Navbar.Brand href="#">Stołówka Szkolna</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Link to='/admin'>Produkty</Link>
                        </Nav>
                    </Navbar.Collapse>  
                        <Nav >
                         <p onClick={logout} style={{ color: "red",marginRight: '15px' }}>Wyloguj</p>
                         </Nav>
                </Navbar>
            </div>
        )
    }
}