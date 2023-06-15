import React, { Component } from 'react';
import { ProductCustomer } from '../../contexAPI';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link} from "react-router-dom";

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductCustomer>
            { value => {
                if( value.Cart.length > 0 ){
                        return (
                            <div  style={{ fontSize: '18px', marginTop:'30px'}}>
                                <div className='row' style={{ fontSize: '18px' }}>
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
                                        <div className='container-fluid text-center ' >
                                            <div className='row '>
                                                <div className='col-10 max-auto col-lg-2'>
                                                    <img style={{width: '18rem', height: '12rem'}} src={cartData.produkt.photo_url}/>                        
                                                </div>
                                                <div className='col-10 max-auto col-lg-2 ' style={{ marginTop: '70px' }}>
                                                    {cartData.produkt.nazwa}                   
                                                </div>
                                                <div className='col-10 max-auto col-lg-2' style={{ marginTop: '70px' }}>
                                                    {cartData.produkt.cena}                   
                                                </div>
                                                <div className='col-10 max-auto col-lg-2' style={{ marginTop: '70px' }}>
                                                    <Button  style={{fontSize:'11px', backgroundColor:"blue" ,borderColor:"blue"}} className='qtyminus' onClick={()=>value.odejmowanie(cartData)}>-</Button> 
                                                    <span style={{ marginLeft: '10px' }}><span style={{ marginRight: '10px' }}>{cartData.licznik}</span></span>
                                                    <Button style={{fontSize:'11px', backgroundColor:"blue" ,borderColor:"blue"}} className='qtyplus' onClick={()=>value.dodawanie(cartData)}>+</Button>
                                                </div>
                                                <div className='col-10 max-auto col-lg-2 ' style={{ marginTop: '70px' }}>
                                                    <Button  style={{fontSize:'16px', backgroundColor:"blue" ,borderColor:"blue"}} onClick={()=>{value.usuwanie(cartData)}} size="sm">Usuń</Button>  
                                                </div>
                                                <div className='col-10 max-auto col-lg-2' style={{ marginTop: '70px' }}>
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
                                            <Button  style={{fontSize:'16px', backgroundColor:"blue" ,borderColor:"blue"}}>Podsumowanie</Button>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <Link to="/">
                                            <Button  style={{fontSize:'16px', backgroundColor:"blue" ,borderColor:"blue"}}>Kontynuuj zakupy</Button>
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
      </section>
    )
  }
}
