import React, { Component } from 'react';
import { ProductCustomer } from '../contexAPI';
import { Button, Col, Container, Row } from 'react-bootstrap';


export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductCustomer>
            { value => {
                if( value.Cart.length > 0 ){
                    return (
                        <div>
                            <div> <h1>Your Cart</h1></div>
                            <div className='row'>
                                <div className='col-10 max-auto col-lg-2 text-center'>
                                    <strong>Car</strong>
                                </div>
                                <div className='col-10 max-auto col-lg-2 text-center'>
                                    <strong>Name of car</strong>
                                </div>
                                <div className='col-10 max-auto col-lg-2 text-center'>
                                    <strong>Price</strong>
                                </div>
                                <div className='col-10 max-auto col-lg-2 text-center'>
                                    <strong>Quantity</strong>
                                </div>
                                <div className='col-10 max-auto col-lg-2 text-center'>
                                    <strong>Remove</strong>
                                </div>
                                <div className='col-10 max-auto col-lg-2 text-center'>
                                    <strong>Total</strong>
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
                                                {cartData.licznik}
                                                <Button size="sm" className='qtyplus' onClick={()=>value.dodawanie(cartData)}>+</Button>
                                            </div>
                                            <div className='col-10 max-auto col-lg-2 '>
                                                <Button variant='secondary' onClick={()=>{value.usuwanie(cartData)}} size="sm">Remove</Button>  
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
                                    {/* <Col><strong>Suma</strong>{value.cartSubtotal}</Col> */}
                                    <Col><strong>Suma</strong>{value.sumaKoszyka}</Col>
                                </Row>
                            </Container>
                        </div>
                    )
                } else {
                    return(
                        <h3>currently your cart is</h3>
                    )
                }
            }}
        </ProductCustomer>
      </section>
    )
  }
}
