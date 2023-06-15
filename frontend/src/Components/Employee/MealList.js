import React, { Component } from 'react';
import { ProductCustomer } from '../../contexAPI';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";
import { Link, withRouter } from "react-router-dom";

export default class MealList extends Component {
    wyswietlanie = () => {
        const successMessage = localStorage.getItem('successMessage');
        const errorMessage = localStorage.getItem('Error');
        if (successMessage) {
          toast.success(successMessage, { duration: 4000 });
          localStorage.removeItem('successMessage');
        }
        if (errorMessage) {
            toast.error(errorMessage, { duration: 4000 });
            localStorage.removeItem('Error');
          }
      }
  render() {
    
    return (
      <section>
        <ProductCustomer>
            { value => {
                        return (
                            <div style={{marginTop:'30px'}}>
                                <div> 
                                    
                                    {/* <h1>Spis Dań</h1> */}
                                </div>
                                <div className='row' style={{ fontSize: '18px' }}>
                                    <div className='col-20 max-auto col-lg-3 text-center'>

                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Nazwa</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-1 text-center'>
                                        <strong>Cena</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Usuń produkt</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Edytuj produkt</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                    <Link to="/employee/addproduct">
                                        <Button style={{ fontSize: '18px' }}>Dodaj nowe danie</Button>
                                    </Link>
                                    </div>
                                </div>
                                {value.details.map( produkt => {
                                    return (
                                        <React.Fragment>
                                            <hr style={{ borderTopWidth: '2px' }}></hr>
                                            <div className='row ' style={{ fontSize: '18px' }}>
                                                <div className='col-20 max-auto col-lg-3 text-center' >
                                                    <img style={{ width: '21rem', height: '14rem', border: '5px solid #ccc', borderRadius: '10px'}} src={produkt.photo_url} className='img-fluid'/>           
                                                </div>
                                                <div className='col-10 max-auto col-lg-2 text-center' style={{ marginTop: '70px' }}>
                                                    {produkt.nazwa}                   
                                                </div>
                                                <div className='col-10 max-auto col-lg-1 text-center' style={{ marginTop: '70px' }}>
                                                    {produkt.cena}                   
                                                </div>
                                                <div className='col-10 max-auto col-lg-2 text-center' style={{ marginTop: '70px' }}>
                                                    <Button  onClick={()=>{value.usuwanieZbazy(produkt)}}  style={{ fontSize: '16px' }}>Usuń</Button> 
                                                </div>
                                                <div className='col-10 max-auto col-lg-2 text-center' style={{ marginTop: '70px' }}>
                                                <Link to="/employee/editmeal" onClick={()=>{value.ustawProdukt(produkt)}} >
                                                    <Button style={{ fontSize: '16px' }}>Edytuj</Button>
                                                </Link>
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
