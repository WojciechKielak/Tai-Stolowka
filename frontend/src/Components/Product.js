import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from "react-bootstrap";
import { ProductCustomer } from '../contexAPI';


export default class Product extends Component {
  render() {
    const {nazwa,opis,cena,photo_url}= this.props.product;
    return (
      <div className='col-9 mx-auto col-md-6 col-lg-3'>
        {/* 5,5 #3 */}
        <ProductCustomer>
            {(value) => (
                <Card >
                    <Link to="/details" onClick={()=>{value.ustaw(this.props.product)}}>
                        <Card.Img variant='top' src={photo_url}  width={250} height={250}></Card.Img>

                    </Link>
                    <Card.Body>
                        <Card.Title>{nazwa} </Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col>
                            </Col>
                            <Col style={{ display: 'grid', placeItems: 'center' }}>
                                <big className='text-muted text-centre'>PLN {cena}</big>
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
