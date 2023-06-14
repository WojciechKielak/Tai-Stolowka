import React, { Component } from 'react';
import { ProductCustomer } from '../contexAPI';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";
import { Link, withRouter } from "react-router-dom";

export default class Cart extends Component {
  render() {
    const {total_amt,cart_items,timestamp,status}= this.props.history;
    const formattedTimestamp = new Date(timestamp).toLocaleString();
    return (
      <section>
        <ProductCustomer>
        { value => {
                        return (
                            <div>
                                
                                <div className='row'>
                                <div className='col-10 max-auto col-lg-2 text-center'>
                                {formattedTimestamp}
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Nazwa</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Cena detaliczna</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Ilość</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Cena</strong>
                                    </div>
                                </div>
                                {cart_items.map( produkt  => {
                                    return (
                                        <React.Fragment>
                                            
                                            <hr style={{ borderTopWidth: '2px' }}></hr>
                                        <div className='container-fluid text-center '>
                                            <div className='row '>
                                                <div className='col-10 max-auto col-lg-2'>
                                                    <img tyle={{width: '6rem', height: '4rem'}} src={value.zwracanieProduktuHistoria(produkt.item).photo_url} className='img-fluid'/>                        
                                                </div>
                                                <div className='col-10 max-auto col-lg-2 '>
                                                    {value.zwracanieProduktuHistoria(produkt.item).nazwa}
                                                </div>
                                                <div className='col-10 max-auto col-lg-2'>
                                                    {value.zwracanieProduktuHistoria(produkt.item).cena}                   
                                                </div>
                                                <div className='col-10 max-auto col-lg-2'>
                                                    <span style={{ marginLeft: '10px' }}><span style={{ marginRight: '10px' }}>{produkt.qty}</span></span>
                                                </div>
                                                <div className='col-10 max-auto col-lg-2'>
                                                    {produkt.qty* value.zwracanieProduktuHistoria(produkt.item).cena}                   
                                                </div> 

                                            </div>
                                        </div>
                                        </React.Fragment>
                                    )
                                })}
    
                                
                                <Container>
                                    <Row>
                                    <strong  style={{ fontSize: '30px' }}>{status && ( <div> Odebrano</div>)}</strong>
                                        <Col>
                                            <strong  style={{ fontSize: '30px' }}>{status} Zapłacono{": "} {total_amt} PLN</strong>
                                        </Col>
                                    </Row>
                                    <hr style={{ borderTopWidth: '5px' }}></hr>
                                </Container>
                            </div>
                        )

                   
                
            }}
        </ProductCustomer>
      </section>
    )
  }
}
