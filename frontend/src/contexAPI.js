import React, {Component} from 'react';
import axios from "axios";
//import { dataProducts, prodInDetails } from './appData';
// import { dataProducts} from './appData';
const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {details : [],
  detailProduct:  {},
}
  ustaw(naz){
    this.detailProduct = naz;
  }
  br(){
    return this.detailProduct;
  }
   
  componentDidMount() {
    const storedData = localStorage.getItem('tokens');
    const parsedData = JSON.parse(storedData);
    
    if (parsedData) {
      axios.get('http://localhost:8000/meals', {
        headers: {
          Authorization: `Bearer ${parsedData.access}`,
        },
      })
        .then(res => {
          const data = res.data;
          this.setState({
            details: data,
          });
          console.log("AAAAAAAAAAAA")
        })
        .catch(err => {
          // Handle error
          console.error(err);
        });
    } else {
      // Handle the case when the access token is null or not available
      console.error('Access token is missing or invalid.');
      // Perform appropriate action, e.g., show an error message or redirect to login page
    }
  }
  
 

  render() {
    return (
     <ProductContext.Provider
      value={{
        details: this.state.details,
        detailProduct: this.state.detailProduct,
        br: this.br,
        ustaw: this.ustaw,

      }}

      >
        {this.props.children}
      </ProductContext.Provider> 
      
    );
  }
  }
const ProductCustomer = ProductContext.Consumer;
export { ProductProvider, ProductCustomer}