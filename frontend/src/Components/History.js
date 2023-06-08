import React, { Component } from 'react';
import { ProductCustomer } from '../contexAPI';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";
import { Link, withRouter } from "react-router-dom";

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductCustomer>
        { value => {
                        return (
                            <div>
                                
                                {value.Cart.map( cartData => {
                                    return (
                                        <React.Fragment>
                                            <hr style={{ borderTopWidth: '2px' }}></hr>
                                        <div className='container-fluid text-center '>
                                            <div className='row '>
                                                <div className='col-10 max-auto col-lg-2'>
                                                    <img tyle={{width: '6rem', height: '4rem'}} src={cartData.produkt.photo_url} className='img-fluid'/>                        
                                                </div>
                                                <div className='col-10 max-auto col-lg-2 '>
                                                    {cartData.produkt.nazwa}                   
                                                </div>
                                                <div className='col-10 max-auto col-lg-2'>
                                                    {cartData.produkt.cena}                   
                                                </div>
                                                <div className='col-10 max-auto col-lg-2'>
                                                    <Button size="sm" className='qtyminus' onClick={()=>value.odejmowanie(cartData)}>-</Button> 
                                                    <span style={{ marginLeft: '10px' }}><span style={{ marginRight: '10px' }}>{cartData.licznik}</span></span>
                                                    <Button size="sm" className='qtyplus' onClick={()=>value.dodawanie(cartData)}>+</Button>
                                                </div>
                                                <div className='col-10 max-auto col-lg-2 '>
                                                    <Button variant='secondary' onClick={()=>{value.usuwanie(cartData)}} size="sm">Usuń</Button>  
                                                </div>
                                                <div className='col-10 max-auto col-lg-2'>
                                                    {cartData.cenaczesciowa}                   
                                                </div>
                                            </div>
                                        </div>
                                        </React.Fragment>
                                    )
                                })}
    
                                <hr style={{ borderTopWidth: '5px' }}></hr>
                                <Container>
                                    <Row>
                                        <Col>
                                            <strong  style={{ fontSize: '30px' }}>Suma{": "} {value.sumaKoszyka}</strong>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )

                   
                
            }}
        </ProductCustomer>
      </section>
    )
  }
}
