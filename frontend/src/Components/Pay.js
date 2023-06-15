import React, { Component } from 'react';
import { ProductCustomer } from '../contexAPI';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";


export default class Pay extends Component {
  render() {
    return (
      <section>
        <ProductCustomer>
            { value => {
                if( value.Cart.length > 0 ){
                    return (
                        <div style={{ fontSize: '18px', marginTop:'30px'}}>
                            {/* <div> <h1>Podsumowanie</h1></div> */}
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
                                                <img style={{width: '18rem', height: '12rem'}} src={cartData.produkt.photo_url} className='img-fluid'/>                        
                                            </div>
                                            <div className='col-10 max-auto col-lg-2 'style={{ marginTop: '70px' }}>
                                                {cartData.produkt.nazwa}                   
                                            </div>
                                            <div className='col-10 max-auto col-lg-2'style={{ marginTop: '70px' }}>
                                                {cartData.produkt.cena}                   
                                            </div>
                                            <div className='col-10 max-auto col-lg-2'style={{ marginTop: '70px' }}>            
                                                {cartData.licznik}
                                            </div>
                                            <div className='col-10 max-auto col-lg-2'style={{ marginTop: '70px' }}>
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
                                    <Col><strong  style={{ fontSize: '25px' }}>Suma{": "} {value.sumaKoszyka}</strong></Col>
                                    <Col>
                                    
                                        <PayPalScriptProvider options={{ "client-id": "Abwme5PEsYp3jeVsDmlzwXCnXr8uPjpqa4MfWwPTyl5PF9-lvwJn14xmS5DVeC2vcQTc6rTYNm-kQDeV", currency: "PLN" }}>
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
                                                
                                                onCancel={() => toast(
                                                    "Anulowałeś płatność, spróbuj ponownie nacisnąć przycisk PayPal", 
                                                    { duration: 4000 }
                                                  )}
                                                  onError={(err) => {
                                                    toast.error("Błąd!", { duration: 4000 });
                                                  }}
                                                  onApprove={(data, actions) => {
                                                    return actions.order.capture().then(function (details) {
                                                    //   toast.success('Płatność zaakceptwana. Smacznego, ' + details.payer.name.given_name, { duration: 8000 });
                                                      localStorage.setItem('successMessage', 'Płatność zaakceptwana. Smacznego, ' + details.payer.name.given_name);
                                                      
                                                    }).then(()=>value.zm());
                                                  }}
                                                // onApprove={this.handlePaymentSuccess}
                                            />
                                        </PayPalScriptProvider>
                                    
                                    </Col>
                                    <button onClick={value.zm}>dsadsa</button>
                                </Row>
                            </Container>
                        </div>
                    )
                    } else {
                        return(
                            <h3>Brak zamówień</h3>

                            
                        )
                    }
                   
                
            }}
        </ProductCustomer>
        <Toaster />
      </section>
    )
  }
}
