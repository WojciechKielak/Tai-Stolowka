import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductCustomer } from '../contexAPI';

const HistoryList = () => {
  return (
    <div className="container">
      <div className="row">
        <ProductCustomer>
          {(value) => {
            if (!value.history || !Array.isArray(value.history)) {
              return null;
            }

            const reversedHistory = value.history.slice().reverse();

            return reversedHistory.map((history) => {
              if (history.cart_items.length > 0) {
                return (
                  <div style={{ fontSize: '18px', marginTop: '30px' }}>
                    <div className="row">
                      <div className="col-10 max-auto col-lg-2 text-center">
                        {new Date(history.timestamp).toLocaleString()}
                      </div>
                      <div className="col-10 max-auto col-lg-2 text-center">
                        <strong>Nazwa</strong>
                      </div>
                      <div className="col-10 max-auto col-lg-2 text-center">
                        <strong>Cena detaliczna</strong>
                      </div>
                      <div className="col-10 max-auto col-lg-2 text-center">
                        <strong>Ilość</strong>
                      </div>
                      <div className="col-10 max-auto col-lg-2 text-center">
                        <strong>Cena</strong>
                      </div>
                    </div>
                    {history.cart_items.map((produkt) => {
                      const product = value.zwracanieProduktuHistoria(produkt.item);

                      return (
                        <React.Fragment key={produkt.item}>
                          <hr style={{ borderTopWidth: '2px' }} />
                          <div className="container-fluid text-center">
                            <div className="row">
                              <div className="col-10 max-auto col-lg-2">
                                <img
                                  style={{ width: '18rem', height: '12rem' }}
                                  src={product.photo_url}
                                  className="img-fluid"
                                  alt={product.nazwa}
                                />
                              </div>
                              <div className="col-10 max-auto col-lg-2" style={{ marginTop: '70px' }}>
                                {product.nazwa}
                              </div>
                              <div className="col-10 max-auto col-lg-2" style={{ marginTop: '70px' }}>
                                {product.cena}
                              </div>
                              <div className="col-10 max-auto col-lg-2" style={{ marginTop: '70px' }}>
                                <span style={{ marginLeft: '10px' }}>
                                  <span style={{ marginRight: '10px' }}>
                                    {produkt.qty}
                                  </span>
                                </span>
                              </div>
                              <div className="col-10 max-auto col-lg-2" style={{ marginTop: '70px' }}>
                                {produkt.qty * product.cena}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}

                    <Container>
                      <Row>
                        <Col>
                          <div style={{ fontSize: '20px', marginTop: '10px' }}>
                            <strong>
                              {history.status} Zapłacono: {history.total_amt} PLN
                            </strong>
                          </div>
                        </Col>
                      </Row>
                      <hr style={{ borderTopWidth: '5px' }} />
                    </Container>
                  </div>
                );
              }
              return null; 
            });
          }}
        </ProductCustomer>
      </div>
    </div>
  );
};

export default HistoryList;
