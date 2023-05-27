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
  sumaKoszyka: 0,
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
      licznik: 1,
      cenaczesciowa: produkt.cena,
    };
    this.setState(() => {
      return {  Cart : [...this.state.Cart, newCartItem]}
    }, () => {
      this.odswiezSumaKoszyka();
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

  dodawanie = (cartData) => {
    let tempCart = [...this.state.Cart];
    const selectedProduct = tempCart.find(item => item === cartData);
    const index = tempCart.indexOf(selectedProduct);
    const produkt = tempCart[index];

    produkt.licznik = produkt.licznik + 1;
    produkt.cenaczesciowa = produkt.licznik * produkt.produkt.cena;

    // this.setState(() => {
    //   return { Cart : [...tempCart] };
    // });
    this.setState(() => {
      return { Cart : [...tempCart] };
    }, () => {
      this.odswiezSumaKoszyka();
    });
  };

  odejmowanie = (cartData) => {
    let tempCart = [...this.state.Cart];
    const selectedProduct = tempCart.find(item => item === cartData);
    const index = tempCart.indexOf(selectedProduct);
    const produkt = tempCart[index];

    if(produkt.licznik > 1)
    {
      produkt.licznik = produkt.licznik - 1;
      produkt.cenaczesciowa = produkt.licznik * produkt.produkt.cena;
  
      // this.setState(() => {
      //   return { Cart : [...tempCart] };
      // });
      this.setState(() => {
        return { Cart : [...tempCart] };
      }, () => {
        this.odswiezSumaKoszyka();
      });
    }
    
  };

  usuwanie = (cartData) => {
    let tempCart = [...this.state.Cart];
    tempCart = tempCart.filter(item => item !== cartData);

    // this.setState(() => {
    //   return {
    //     Cart: [...tempCart],
    //   };
    // });
    this.setState(() => {
      return {
        Cart: [...tempCart],
      };
    }, () => {
      this.odswiezSumaKoszyka();
    });
  };
  odswiezSumaKoszyka = () => {
    let subTotal = 0;
    this.state.Cart.map(item => (subTotal += item.cenaczesciowa));
    const total = subTotal;
    this.setState(() => {
      return {
        sumaKoszyka : subTotal
      };
    });
  };
    render() {
      return (
        <ProductContext.Provider
        value={{
          details: this.state.details,
          detailProduct: this.state.detailProduct,
          sumaKoszyka: this.state.sumaKoszyka,
          Cart: this.state.Cart,
          br: this.br,
          ustaw: this.ustaw,
          CzyWkoszyku: this.CzyWkoszyku,
          DodajDoKoszyka: this.DodajDoKoszyka,
          usuwanie: this.usuwanie,
          dodawanie: this.dodawanie,
          odejmowanie: this.odejmowanie,
  


        }}

        >
          {this.props.children}
        </ProductContext.Provider>
        
      );
    }
  }
const ProductCustomer = ProductContext.Consumer;
export { ProductProvider, ProductCustomer}