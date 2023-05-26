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
  detailProduct:  {},
  Cart : [],
}

ustaw = (produkt) => {
  this.setState(() => {
    return {  detailProduct : produkt}
  });
}

  CzyWkoszyku = (produkt) => {
    const { Cart } = this.state;
    const foundProduct = Cart.find(item => item.produkt === produkt);
    return !!foundProduct;
  }
  // DodajDoKoszyka = (produkt) => {
  //   this.setState(() => {
  //     return {  Cart : [...this.state.Cart, produkt]}
  //   });
  // }
  DodajDoKoszyka = (produkt) => {
    const newCartItem = {
      produkt: produkt,
      wKoszyku: true,
      licznik: 1
    };
    this.setState(() => {
      return {  Cart : [...this.state.Cart, newCartItem]}
    });
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



    render() {
      return (
        <ProductContext.Provider
        value={{
          details: this.state.details,
          detailProduct: this.state.detailProduct,
          br: this.br,
          ustaw: this.ustaw,
          CzyWkoszyku: this.CzyWkoszyku,
          DodajDoKoszyka: this.DodajDoKoszyka,
  


        }}

        >
          {this.props.children}
        </ProductContext.Provider>
        
      );
    }
  }
const ProductCustomer = ProductContext.Consumer;
export { ProductProvider, ProductCustomer}