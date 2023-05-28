import React from 'react';
import { ProductCustomer } from '../contexAPI';
import Product from './Product';

const ProductList = () => {
  return (
    <div className="container">
      <div>
        <h1>Dania</h1>
      </div>
      <div className="row">
        <ProductCustomer>
          {(value) => {
            return value.details.map((product) => {
              return <Product product={product} />;
            });
          }}
        </ProductCustomer>
      </div>
    </div>
  );
};

export default ProductList;
