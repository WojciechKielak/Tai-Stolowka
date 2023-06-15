import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ProductCustomer } from '../../contexAPI';

const Orders = () => {
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

  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllHistories();
    getAllUsers();
  }, []);

  const getAllHistories = async () => {
    try {
      const storedData = localStorage.getItem('tokens');
      const parsedData = JSON.parse(storedData);
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${parsedData.access}`,
        },
      };

      const response = await fetch('http://localhost:8000/history/', requestOptions);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const historyData = await response.json();
      setHistory(historyData.histories);
    } catch (error) {
      console.error(error);
    }
  };
  

  const getAllUsers = async () => {
    try {
      const storedData = localStorage.getItem('tokens');
      const parsedData = JSON.parse(storedData);
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${parsedData.access}`,
        },
      };

      const response = await fetch('http://localhost:8000/api/users/', requestOptions);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };
  const Zrobione = async (order) => {
    try {
      const storedData = localStorage.getItem('tokens');
      const parsedData = JSON.parse(storedData);
      const requestOptions = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${parsedData.access}`,
        },
      };

      const response = await fetch(`http://localhost:8000/history/${order.id}/`, requestOptions);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      localStorage.setItem('successMessage', 'Produkt gotowy');
      window.location.href = '/employee/orders';
    } catch (error) {
      console.error(error);
      localStorage.setItem('Error', 'Błąd');
      window.location.href = '/employee/orders';
    } 

  };

 
  return (
    <div className="container" style={{marginTop:'30px'}} >
      <ProductCustomer>
        {(value) => (
          <>

            {history.map((historyItem) => (
              !historyItem.status && historyItem.cart_items.length > 0 &&(
              <React.Fragment>
                <div className='row' style={{fontSize:'20px'}}>
                                <div className='col-10 max-auto col-lg-6'>
                                
                                <strong>{users.find(item => item.pk === historyItem.user).email}</strong>
                                
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Nazwa</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Ilość</strong>
                                    </div>
                                </div>



                <div className="container-fluid text-center">
                  <div className="row">
                    
                    {historyItem.cart_items.map((produkt) => (
                      <React.Fragment>
                       <hr  style={{ borderTopWidth: '2px' , marginTop:'20px'}}></hr>                     
                     
                  <div className='container-fluid text-center ' style={{ fontSize: '20px' }}>
                      <div className='row '>
                      <div className='col-10 max-auto col-lg-6'>
                                <img
                                  style={{ width: '24rem', height: '16rem',  border: '5px solid #ccc', borderRadius: '10px'}}
                                  src={value.zwracanieProduktuHistoria(produkt.item).photo_url}
                                  className='img-fluid'
                                  alt={value.zwracanieProduktuHistoria(produkt.item).nazwa}
                                />
                              </div>
                          <div className='col-10 max-auto col-lg-2 '  style={{ marginTop: '80px' }}>
                              {value.zwracanieProduktuHistoria(produkt.item).nazwa}
                          </div>

                          <div className='col-10 max-auto col-lg-2' style={{ marginTop: '80px' }}>
                              <span style={{ marginLeft: '10px' }}><span style={{ marginRight: '10px' }}>{produkt.qty}</span></span>
                          </div>

                      </div>
                  </div>
                  
                  </React.Fragment>
                    ))}
                    <div className='col-10 max-auto col-lg-4'/>
                    <div className="col-30 max-auto col-lg-6">
                        <button
                            className="btn btn-primary btn-block"
                            onClick={() => Zrobione(historyItem)}
                            style={{ marginTop: '20px' ,fontSize: '19px'}}
                        >
                            Zrobione
                        </button>
                    </div>

                    <hr  style={{ borderTopWidth: '5px',marginTop:'10px' }}></hr>
                  </div>
                </div>
              </React.Fragment>
              )

            ))}
          </>
        )}
      </ProductCustomer>
      <Toaster />
    </div>
  );
};

export default Orders;