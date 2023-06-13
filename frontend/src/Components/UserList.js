import React, { Component } from 'react';
import { ProductCustomer } from '../contexAPI';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";
import { Link, withRouter } from "react-router-dom";

export default class UserList extends Component {
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

                        return (
                            <div>
                                <div> 
                                    
                                    <h1>Lista użytkowników</h1>
                                    <span style={{ display: 'inline-block', float: 'right', marginRight:"30px"}}>
                                    <Link to="/admin/adduser">
                                        <Button>Dodaj nowego użytkownika</Button>
                                    </Link>
                                      </span>
                                </div>
                            
    
                            </div>
                        )

                   
                
            }}
        </ProductCustomer>
        <Toaster />
      </section>
    )
  }
}
