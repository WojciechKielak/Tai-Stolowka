import React, {Component} from 'react';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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
          console.log(this.state.details)
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

usuwanieZbazy = async (product) => {
    const storedData = localStorage.getItem('tokens');
    const parsedData = JSON.parse(storedData);
    console.log(product.pk);
    if (parsedData) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedData.access}`,
        },
        //body: JSON.stringify({ "pk": produkt.pk })
      };
      //let pk = produkt.pk;
      try {
        console.log(`http://localhost:8000/meals/${product.pk}/`)
        const response = await fetch(`http://localhost:8000/meals/${product.pk}/`, requestOptions);
        if (response.ok) {
          localStorage.setItem('successMessage', 'Produkt usunięto z bazy');
          // Successful deletion
          console.log('Product deleted successfully');
          window.location.reload();
        } else {
          // Error handling
          console.error('Error deleting product:', response.status, response.statusText);
          localStorage.setItem('Error', 'Błąd podczas usuwania produktu');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        localStorage.setItem('Error', 'Błąd podczas usuwania produktu');
      }
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
          usuwanieZbazy: this.usuwanieZbazy,

      }}

      >
        {this.props.children}
        <Toaster/>
      </ProductContext.Provider> 
      
    );
  }
  }
const ProductCustomer = ProductContext.Consumer;
export { ProductProvider, ProductCustomer}