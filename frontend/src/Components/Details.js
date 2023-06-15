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
                            <h1 style={{marginTop:'20px'}}>{nazwa}</h1>
                            
                        </div>
                        <div className='row'>
                            <div className='col-4 mx-auto text-center'>
                                <img src={photo_url} className='img-fluid' style={{ width: '27rem', height: '18rem',  border: '5px solid #ccc', borderRadius: '10px', marginTop:'20px'}}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-4 mx-auto col-md-4' >
                                
                                <h2 style={{marginTop:'20px'}}>Opis: </h2>
                                <div style={{fontSize:'18px'}}>{opis}</div>
                                <h5>
                                    <strong> 
                                    <span style={{ display: 'inline-block', float: 'left' ,marginTop: '20px' ,fontSize:'25px'}}>Cena: </span>
                                    <span style={{ display: 'inline-block', float: 'right' ,marginTop: '20px',fontSize:'25px' }}>{cena}{" "}PLN</span>
                                    </strong>
                                    
                                </h5>
                                <br/>
                                <br/>
                                <br/>
                            
                                <div>
                                <span style={{ display: 'inline-block',}}>
                                    <Link to="/" style={{fontSize:'20px',textDecoration: 'none'}}>Powrót</Link>
                                    
                                </span>
                                <span style={{ display: 'inline-block',float: 'right'}}>
                                        <Button  style={{fontSize:'16px', backgroundColor:"blue" ,borderColor:"blue"}} disabled={value.CzyWkoszyku(value.br())} onClick={()=>{value.DodajDoKoszyka(value.br())}}  >
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
