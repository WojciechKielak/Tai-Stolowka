import React, {Component} from 'react';
import axios from "axios";
import { Toaster } from 'react-hot-toast';
const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {details : [],
    detailProduct:  {},
    Cart : [],
    sumaKoszyka: 0,
    history: [],
    ProduktHistoria: [],

}
ustawProdukt = (produkt) => {
  this.setState(() => {
    return {  detailProduct : produkt}
  });
}
zwracanieProduktuHistoria = (pk) => {
  let tempCart = [...this.state.details];
  const selectedProduct = tempCart.find(item => item.pk === pk);
  return selectedProduct;
}

platnosc = () => {
  window.location.href = '/';
  const { Cart } = this.state;
  const { sumaKoszyka } = this.state;

  const storedData = localStorage.getItem('tokens');
  const parsedData = JSON.parse(storedData);

  const storedUserId = localStorage.getItem('pk');
  const parsedUserId = JSON.parse(storedUserId);
  const data = {
    "user": parsedUserId,
    "total_amt": sumaKoszyka,
    "cart_items": []
  }
  
  Cart.forEach(item => {
    let dictTemp = {
      "item": item.produkt.pk,
      "qty": item.licznik
    };
    data.cart_items.push(dictTemp);
  });
  const AddHistory = async () => {
    if (parsedData) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedData.access}`,
        },
        body: JSON.stringify(data),
      };
      try {
        const response = await fetch('http://localhost:8000/history/post/', requestOptions);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
      
    }
  };
  AddHistory(); 
  this.setState(() => {
    return {
      detailProduct: {},
      Cart: [],
      sumaKoszyka: 0,
    };
  });
};

HistoryGetter () {
  const storedData = localStorage.getItem('tokens');
  const parsedData = JSON.parse(storedData);

  const storedUserId = localStorage.getItem('pk');
  const parsedUserId = JSON.parse(storedUserId);

  const GetHistoryOfUser = async () => {
    if (parsedData) {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedData.access}`,
        },
      };
      try {
        const response = await fetch(`http://localhost:8000/history/${parsedUserId}`, requestOptions);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const historyData = await response.json();
        console.log( historyData.histories);
        this.setState({
          history: historyData.histories,
          });
      } catch (error) {
        console.error(error);
      }
    }
  };
  GetHistoryOfUser(); 
};
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
zwracaProdukt(){
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
          console.error(err);
        });
    } else {
      console.error('Access token is missing or invalid.');
    }
    this.HistoryGetter();
  }

  dodawanie = (cartData) => {
    let tempCart = [...this.state.Cart];
    const selectedProduct = tempCart.find(item => item === cartData);
    const index = tempCart.indexOf(selectedProduct);
    const produkt = tempCart[index];

    produkt.licznik = produkt.licznik + 1;
    produkt.cenaczesciowa = produkt.licznik * produkt.produkt.cena;

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
      };
      try {
        console.log(`http://localhost:8000/meals/${product.pk}/`)
        const response = await fetch(`http://localhost:8000/meals/${product.pk}/`, requestOptions);
        if (response.ok) {
          localStorage.setItem('successMessage', 'Produkt usunięto z bazy');
          window.location.reload();
        } else {
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
          history: this.state.history,
          ProduktHistoria: this.ProduktHistoria,
          zwracaProdukt: this.zwracaProdukt,
          ustawProdukt: this.ustawProdukt,
          CzyWkoszyku: this.CzyWkoszyku,
          DodajDoKoszyka: this.DodajDoKoszyka,
          usuwanie: this.usuwanie,
          dodawanie: this.dodawanie,
          odejmowanie: this.odejmowanie,
          ilosc: this.ilosc,
          platnosc: this.platnosc,
          usuwanieZbazy: this.usuwanieZbazy,
          HistoryGetter: this.HistoryGetter,

          zwracanieProduktuHistoria: this.zwracanieProduktuHistoria,
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