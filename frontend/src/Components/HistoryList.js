import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from "react-bootstrap";
import { ProductCustomer } from '../contexAPI';
import Product from './Product';
import History from './History';

const HistoryList = () => {
    return (
      <div className="container">
        <div> <h1>Historia</h1></div>
                                {/* <div className='row'>
                                <div className='col-10 max-auto col-lg-2 text-center'>
                                  
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
                                        <strong>Cena</strong>
                                    </div>
                                </div> */}
        <div className="row">
          <ProductCustomer>
            {(value) => {
              // value.HistoryGetter();
              // console.log("? "+value.history)
              return value.history.reverse().map((history) => {
                return <History history={history} />;
              });
            }}
          </ProductCustomer>
        </div>
      </div>
    );
  };
  
  export default HistoryList;