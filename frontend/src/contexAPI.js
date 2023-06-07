import React, {Component} from 'react';
import axios from "axios";
//import { dataProducts, prodInDetails } from './appData';
// import { dataProducts} from './appData';
const ProductContext = React.createContext();

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
zm = () => {
  this.setState(() => {
    return {  
    detailProduct:  {},
    Cart : [],
    sumaKoszyka: 0,}
  });
}
  CzyWkoszyku = (produkt) => {
    const { Cart } = this.state;
    const foundProduct = Cart.find(item => item.produkt === produkt);
    return !!foundProduct;
  }
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
    })};
br(){
  return this.detailProduct;
}
ilosc(){
  return this.Cart.length;
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
          platnosc: this.state.platnosc,
          br: this.br,
          ustaw: this.ustaw,
          CzyWkoszyku: this.CzyWkoszyku,
          DodajDoKoszyka: this.DodajDoKoszyka,
          usuwanie: this.usuwanie,
          dodawanie: this.dodawanie,
          odejmowanie: this.odejmowanie,
          ilosc: this.ilosc,
          zm: this.zm,

      }}

      >
        {this.props.children}
      </ProductContext.Provider> 
      
    );
  }
  }
const ProductCustomer = ProductContext.Consumer;
export { ProductProvider, ProductCustomer}