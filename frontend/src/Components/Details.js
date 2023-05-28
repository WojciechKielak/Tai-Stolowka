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
                            <h1>{nazwa}</h1>
                            
                        </div>
                        <div className='row'>
                            <div className='col-4 mx-auto text-center'>
                                <img src={photo_url} className='img-fluid'/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4 mx-auto col-md-3'>
                                
                                <h4>Opis: </h4>
                                <div>{opis}</div>
                                <h5>
                                    <strong> 
                                    <span style={{ display: 'inline-block', float: 'left' ,marginTop: '20px' }}>Cena: </span>
                                    <span style={{ display: 'inline-block', float: 'right' ,marginTop: '20px' }}>{cena}{" "}PLN</span>
                                    </strong>
                                    
                                </h5>
                                <br/>
                                <br/>
                                <br/>
                            
                                <div>
                                <span style={{ display: 'inline-block',}}>
                                    <Link to="/products">Powrót</Link>
                                    
                                </span>
                                <span style={{ display: 'inline-block',float: 'right'}}>
                                        <Button size='sm' disabled={value.CzyWkoszyku(value.br())} onClick={()=>{value.DodajDoKoszyka(value.br())}}  variant="secondary">
                                            {value.CzyWkoszyku(value.br())===true? (<span>W koszyku</span>) : (<span>Dodaj do Koszyka</span>)}
                                        </Button>
                                    </span>

                                    
                                </div>
                                
                                
                            </div>
                        </div>
                        
                    </div>
                )
            }}
        </ProductCustomer>
    )
  }
}
