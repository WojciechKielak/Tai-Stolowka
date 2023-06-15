import React, {Component, useContext} from "react";
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductCustomer } from "../contexAPI";
import AuthContext from "../Context/AuthContext";
import { FaShoppingCart , FaSignOutAlt, FaHistory, FaHome  } from 'react-icons/fa';

export default class Nab extends Component{
    static contextType = AuthContext;

    render() {
        const {logout} = this.context;
        return (
            <div>
                <ProductCustomer>
                    {(value)=>{
                        return( 
                            <Navbar collapseOnSelect expand = "lg" bg="dark" variant="dark">
                            <Navbar.Brand style={{ fontSize: '32px' }} href="/">Stołówka Szkolna</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav  style={{ fontSize: '22px' }} className="mr-auto">
                                <Link to='/'style={{ textDecoration: 'none',color:"white", marginLeft: '30px' }}> <FaHome/>  Produkty </Link>
                                </Nav>
                                
                            </Navbar.Collapse> 
                            <Nav style={{ fontSize: '22px' }}> 
                                <Link style={{color:"white"}} eventKey={2} onClick={()=>{window.location.href = '/history'}} className="justify-content-end">
                                            <span style={{ display: 'inline-block', marginRight: '30px'  }}>Historia <FaHistory /></span>
                                </Link>
                            </Nav> 
                            <Nav style={{ fontSize: '22px' }}> 
                                <Link style={{color:"white"}} eventKey={2} to="/cart" className="justify-content-end">
                                            <span style={{ display: 'inline-block', marginRight: '30px'  }}>Koszyk ( {value.ilosc()} ) <FaShoppingCart /></span>
                                </Link>
                            </Nav> 
                            <Nav style={{ fontSize: '22px' }}>
                         <p onClick={logout} style={{ color: "white",marginRight: '15px' }}>Wyloguj  <FaSignOutAlt /></p>
                         </Nav>
                        </Navbar>
                        )

                    }}
                </ProductCustomer>

            </div>
            // <div>
            //     <Navbar collapseOnSelect expand = "lg" bg="dark" variant="dark">
            //         <Navbar.Brand href="#">Stołówka Szkolna</Navbar.Brand>
            //         <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            //         <Navbar.Collapse id="responsive-navbar-nav">
            //             <Nav className="mr-auto">
            //             <Link to='/'>Produkty</Link>
            //             </Nav>
            //             <Nav >
            //             <Link style={{color:"mediumspringgreen"}} eventKey={2} to="/cart" className="justify-content-end">
            //                         Koszyk()
            //             </Link>
            //             </Nav>
            //             <Nav >
            //             <p onClick={logout} style={{ color: "red" }}>Wyloguj</p>
            //             </Nav>
            //         </Navbar.Collapse>  
            //     </Navbar>
            // </div>
        )
    }
}