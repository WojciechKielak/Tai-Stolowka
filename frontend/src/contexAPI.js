import React, {Component, useContext} from 'react';
import axios from "axios";
import AuthContext from './Context/AuthContext';
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
    const token = localStorage.getItem('tokens');
    const parsedData = JSON.parse(token);
    const accessToken = parsedData.access;
    axios.get('http://localhost:8000/meals/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        const data = response.data;
        //console.log(data);
        this.setState({
          details:data
      });
      })
      .catch(error => {
        // Handle the error
        this.setState({
          details:accessToken
      });
        console.error(error);
      });
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