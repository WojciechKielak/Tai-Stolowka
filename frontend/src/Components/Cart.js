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
                if( value.Cart.length > 0 ){
                        return (
                            <div>
                                <div> <h1>Koszyk</h1></div>
                                <div className='row'>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong></strong>
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
                                        <strong>Usuń produkt</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Cena</strong>
                                    </div>
                                </div>
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
                                        <Col>
                                            <Link to="/pay">
                                            <Button >Podsumowanie</Button>
                                            </Link>
                                            {/* <PayPalScriptProvider options={{ "client-id": "Abwme5PEsYp3jeVsDmlzwXCnXr8uPjpqa4MfWwPTyl5PF9-lvwJn14xmS5DVeC2vcQTc6rTYNm-kQDeV", currency: "PLN" }}>
                                                <PayPalButtons
                                                
                                                    style={{ layout: "horizontal" }}
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                            amount: {
                                                                value: value.sumaKoszyka.toString(),
                                                            },
                                                            },
                                                        ],
                                                        });
                                                    }}
                                                    
                                                    updateOrderTotal={(data, actions) => {
                                                        return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                            amount: {
                                                                value: value.sumaKoszyka.toString(),
                                                            },
                                                            },
                                                        ],
                                                        });
                                                    }}
                                                    onCancel={() => toast(
                                                        "You cancelled the payment. Try again by clicking the PayPal button", 
                                                        {
                                                          duration: 6000
                                                        }
                                                      )}
                                                      onError={(err) => {
                                                        toast.error("There was an error processing your payment. If this error please contact support.", { duration: 600 });
                                                      }}
                                                      onApprove={(data, actions) => {
                                                        return actions.order.capture().then(function (details) {
                                                          toast.success('Payment completed. Thank you, ' + details.payer.name.given_name);

                                                        });
                                                      }}
                                                    // onApprove={function(data, actions) {
                                                    //     return actions.order.capture().then(function(details) {
                                                    //       // Wywołanie metody obsługi sukcesu płatności
                                                    //       this.handlePaymentSuccess();
                                                    //     }.bind(this));
                                                    //   }.bind(this)}
                                                />
                                            </PayPalScriptProvider> */}
                                        </Col>
                                        <Col>
                                            <Link to="/products">
                                            <Button >Kontynuuj zakupy</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )
                    } else {
                        return(
                            <h1>Koszyk jest pusty</h1>
                            
                        )
                    }
                   
                
            }}
        </ProductCustomer>
        <Toaster />
      </section>
    )
  }
}
