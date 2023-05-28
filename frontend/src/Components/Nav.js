import React, {Component} from "react";
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductCustomer } from "../contexAPI";

export default class Nab extends Component{
    render() {
        return (
            <div>
                <ProductCustomer>
                    {(value)=>{
                        return( 
                            <Navbar collapseOnSelect expand = "lg" bg="dark" variant="dark">
                            <Navbar.Brand href="#">Stołówka Szkolna</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                <Link to='/products'>Produkty</Link>
                                </Nav>
                                
                            </Navbar.Collapse> 
                            <Nav > 
                                <Link style={{color:"mediumspringgreen"}} eventKey={2} to="/cart" className="justify-content-end">
                                            <span style={{ display: 'inline-block', marginRight: '30px'  }}>Koszyk ( {value.ilosc()} ) </span>
                                </Link>
                            </Nav> 
                            
                        </Navbar>
                        )

                    }}
                </ProductCustomer>

            </div>
        )
    }
}