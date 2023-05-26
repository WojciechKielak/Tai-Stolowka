import React, { Component } from 'react';
import { ProductCustomer } from '../contexAPI';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default class Details extends Component {
  render() {
    return (
        <ProductCustomer>
            {(value)=> {
                // const {id, title, img, info, price, company, inCart} = value.detailProduct;
                // const { nazwa, opis, cena, photo_url } = value.find((item) => item.nazwa === "Pizza");
                const { nazwa, opis, cena, photo_url } = value.br();
                // product = this.state.details.find((item) => item.nazwa === nazwa)
            
                return (
                    <div className='container'>
                        <div className=' col-10 mx-auto text-center'>
                            <h1>Danie {nazwa}</h1>
                            
                        </div>
                        <div className='row'>
                            <div className='col-4 mx-auto col-md-r'>
                                <img src={photo_url} className='img-fluid'/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4 mx-auto col-md-4'>
                                <h4>
                                    {nazwa}
                                </h4>
                                <h5>
                                    <strong> Cena: <span>PLN</span>{cena}</strong>
                                </h5>
                                <p>Opis: </p>
                                <div>{opis}</div>
                                <div>
                                    <Link to="/products">Powrót</Link>
                                </div>
                                <Button size='sm' disabled={false} onClick={()=>{value.DodajDoKoszyka(value.br())}}  variant="secondary">
                                    {value.CzyWkoszyku(value.br())===true? (<span>W koszyku</span>) : (<span>Dodaj do Koszyka</span>)}
                                </Button>
                            </div>
                        </div>
                        
                    </div>
                )
            }}
        </ProductCustomer>
    )
  }
}
