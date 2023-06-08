import React, { Component } from 'react';
import { ProductCustomer } from '../contexAPI';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";
import { Link, withRouter } from "react-router-dom";

export default class Mmeals extends Component {
  render() {
    return (
      <section>
        <ProductCustomer>
            { value => {
                        return (
                            <div>
                                <div> 
                                    <h1>Spis Dań</h1>
                                    <span style={{ display: 'inline-block', float: 'right', marginRight:"30px"}}>
                                    <Link to="/addproduct">
                                        <Button>Dodaj nowe danie</Button>
                                    </Link>
                                      </span>
                                </div>
                                <div className='row'>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong></strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Nazwa</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Cena</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Usuń produkt</strong>
                                    </div>
                                </div>
                                {value.details.map( produkt => {
                                    return (
                                        <React.Fragment>
                                            <hr style={{ borderTopWidth: '2px' }}></hr>
                                        <div className='container-fluid text-center '>
                                            <div className='row '>
                                                <div className='col-10 max-auto col-lg-2'>
                                                    <img tyle={{width: '6rem', height: '4rem'}} src={produkt.photo_url} className='img-fluid'/>                        
                                                </div>
                                                <div className='col-10 max-auto col-lg-2 '>
                                                    {produkt.nazwa}                   
                                                </div>
                                                <div className='col-10 max-auto col-lg-2'>
                                                    {produkt.cena}                   
                                                </div>
                                                <div className='col-10 max-auto col-lg-2 '>
                                                    <Button variant='secondary' onClick={()=>{value.usuwanie(produkt)}} size="sm">Usuń</Button>  
                                                </div>
                                            </div>
                                        </div>
                                        </React.Fragment>
                                    )
                                })}
    
                            </div>
                        )

                   
                
            }}
        </ProductCustomer>
        <Toaster />
      </section>
    )
  }
}
