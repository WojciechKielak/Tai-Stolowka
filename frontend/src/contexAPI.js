import React, {Component } from 'react';
import axios from "axios";
//import { dataProducts, prodInDetails } from './appData';
// import { dataProducts} from './appData';
const ProductContext = React.createContext();
const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true
});
class ProductProvider extends Component {
  state = {details : [],
  detailProduct:  {},}

  ustaw(naz){
    this.detailProduct = naz;
  }
  br(){
    return this.detailProduct;
  }
  componentDidMount(){
      let data;
      // axios.get('http://127.0.0.1:8000/meals')
      client.get('/meals')
      .then(
          res => {
              data=res.data;
              this.setState({
                  details:data
              });
          }
      )
      .catch(err => { })
  }
  getTokenFromCookies() {
    // Retrieve the token from cookies
    const token = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('token='))
      .split('=')[1];
    
    return token;
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