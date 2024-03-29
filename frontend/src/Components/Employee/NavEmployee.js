import React, {Component} from "react";
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from "../../Context/AuthContext";
import { FaShoppingCart  , FaSignOutAlt, FaHome } from 'react-icons/fa';

export default class NavEmployee extends Component{
    static contextType = AuthContext;

    render() {
        const {logout} = this.context;
        return (
            <div>
               <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'blue' }}>
                    <Navbar.Brand  style={{ fontSize: '32px',color:"white" }} href="/employee">Stołówka Szkolna</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"style={{ fontSize: '22px' }} >
                        <Link to='/employee' style={{ textDecoration: 'none',color:"white", marginLeft: '30px' }}> <FaHome/> Produkty</Link>
                        </Nav>
                    </Navbar.Collapse>  
                    <Nav style={{ fontSize: '22px' }}> 
                                <Link style={{color:"white"}} eventKey={2} to="/employee/orders" className="justify-content-end">
                                            <span style={{ display: 'inline-block', marginRight: '30px'  }}>Zamówienia <FaShoppingCart  /></span>
                                </Link>
                            </Nav> 
                        <Nav style={{ fontSize: '22px' }}>
                         <p onClick={logout} style={{ color: "white",marginRight: '15px' }}>Wyloguj <FaSignOutAlt /> </p>
                         </Nav>
                </Navbar>
            </div>
        )
    }
}