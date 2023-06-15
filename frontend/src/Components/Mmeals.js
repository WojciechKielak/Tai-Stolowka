import React, { Component } from 'react';
import { ProductCustomer } from '../contexAPI';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";
import { Link, withRouter } from "react-router-dom";

export default class Mmeals extends Component {
    componentDidMount = () => {
        console.log('componentDidMount');
        // toast.success("SSSSSSSSSSSSSSSSSSSSSSSS", { duration: 4000 });
        const successMessage = localStorage.getItem('successMessage');
        const errorMessage = localStorage.getItem('Error');
        if (successMessage) {
          toast.success(successMessage, { duration: 4000 });
          localStorage.removeItem('successMessage');
        }
        if (errorMessage) {
            toast.success(errorMessage, { duration: 4000 });
            localStorage.removeItem('Error');
          }
      }
  render() {
    
    return (
      <section>
        <ProductCustomer>
            { value => {
if(value.details.length==0)
            {
            //   window.location.href = '/employee';
            //   console.log("TAAAAAK")
            //   value.componentDidMount();
            //   if(value.details.length  == 0)console.log("TAAAAAK2222222222")
            }
            // else window.location.href = '/';
                        return (
                            <div>
                                <div> 
                                    
                                    <h1>Spis Dań</h1>
                                    <span style={{ display: 'inline-block', float: 'right', marginRight:"30px"}}>
                                    <Link to="/employee/addproduct">
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
                                                    {/* <Button variant='secondary' onClick={()=>{value.usuwanieZbazy(produkt).then(toast.success('Produkt usunięto z bazy ', { duration: 8000 }))}} size="sm">Usuń</Button>  */}
                                                    <Button variant='secondary' onClick={()=>{value.usuwanieZbazy(produkt)}} size="sm">Usuń</Button> 
                                                </div>
                                                <div className='col-10 max-auto col-lg-2 '>
                                                <Link to="/employee/editmeal" onClick={()=>{value.ustaw(produkt)}} >
                                                    <Button>Edytuj</Button>
                                                </Link>
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
