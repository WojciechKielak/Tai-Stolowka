import React, {Component, useContext} from "react";
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from "../../Context/AuthContext";
import { FaSignOutAlt, FaUser  } from 'react-icons/fa';

export default class NavAdmin extends Component{
    static contextType = AuthContext;

    render() {
        const {logout} = this.context;
        return (
            <div>
               <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'grey' }}>
                    <Navbar.Brand  style={{ fontSize: '32px',color:"white" }} href="/admin">Stołówka Szkolna</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                    </Navbar.Collapse>  
                    <Nav style={{ fontSize: '22px' }}> 
                                <Link style={{color:"white"}} eventKey={2} to="/admin" className="justify-content-end">
                                            <span style={{ display: 'inline-block', marginRight: '30px'  }}>Użytkownicy <FaUser /></span>
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