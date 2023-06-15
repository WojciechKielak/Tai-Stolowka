import React from 'react';
import { ProductCustomer } from '../../contexAPI';
import Product from './Product';
import toast, { Toaster } from 'react-hot-toast';

const ProductList = () => {
  const successMessage = localStorage.getItem('successMessage');
  const errorMessage = localStorage.getItem('Error');
  if (successMessage) {
    localStorage.removeItem('successMessage');
    toast.success(successMessage, { duration: 4000 });
    
  }
  if (errorMessage) {
      toast.success(errorMessage, { duration: 4000 });
      localStorage.removeItem('Error');
    }

  return (
    <div className="container">
      <div className="row" style={{marginTop:'30px'}}>
        <ProductCustomer>
          {(value) => {
            return value.details.map((product) => {
              return <Product product={product} />;
            });
          }}
        </ProductCustomer>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductList;
