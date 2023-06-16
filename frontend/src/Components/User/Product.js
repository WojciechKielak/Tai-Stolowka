import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from "react-bootstrap";
import { ProductCustomer } from '../../contexAPI';


export default class Product extends Component {
  render() {
    const {nazwa,opis,cena,photo_url}= this.props.product;
    return (
      <div className='col-9 mx-auto col-md-6 col-lg-3'style={{ marginTop: '30px' }}>
        <ProductCustomer>
            {(value) => (
                <Card >
                    <Link to="/details" onClick={()=>{value.ustawProdukt(this.props.product)}}>
                        <Card.Img variant='top' src={photo_url}  width={250} height={250}></Card.Img>

                    </Link>
                    <Card.Body>
                        <Card.Title>{nazwa} </Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                        <Col>
                                <Button size='sm' style={{ fontSize:'14px', backgroundColor:"blue" ,borderColor:"blue"}} disabled={value.CzyWkoszyku(this.props.product)} onClick={()=>{value.DodajDoKoszyka(this.props.product)}}  variant="secondary">
                                    {value.CzyWkoszyku(this.props.product)===true? (<span>W koszyku</span>) : (<span>Dodaj do Koszyka</span>)}
                                </Button>
                            </Col>
                            <Col style={{ display: 'grid', placeItems: 'center' ,fontSize:'18px'}}>
                                <big className='text-muted text-centre'>{cena } PLN</big>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>

            )}
        </ProductCustomer>

      </div>
    )
  }
}