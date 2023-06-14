import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ProductCustomer } from '../contexAPI';

const Orders = () => {
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
      console.log(historyData.histories);
      console.log('HHHPPP ');
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
      console.log(usersData);
      console.log('UUUUTTTTTT');
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };
  const Zrobione = async (order) => {
    console.log(order);
    console.log("ORDE");

    // try {
    //   const storedData = localStorage.getItem('tokens');
    //   const parsedData = JSON.parse(storedData);
    //   const requestOptions = {
    //     method: 'DELETE',
    //     headers: {
    //       Authorization: `Bearer ${parsedData.access}`,
    //     },
    //   };

    //   const response = await fetch(`http://localhost:8000/api/users/${user.pk}/`, requestOptions);
    //   if (!response.ok) {
    //     throw new Error(response.statusText);
    //   }
    //   console.log('User deleted successfully.');
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // const GetUser = async (id) => {
  //   try {
  //     const storedData = localStorage.getItem('tokens');
  //     const parsedData = JSON.parse(storedData);
  //     const requestOptions = {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${parsedData.access}`,
  //       },
  //     };

  //     const response = await fetch(`http://localhost:8000/api/users/${id}/`, requestOptions);
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }s
  //     const historyData = await response.json();
  //     console.log(historyData);
  //     console.log('UUUUUUUUUUUUUUUUUUUUU ');
  //     setUser(historyData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // console.log(users[1].pk === 2)
  // console.log(users.find(item => item.pk === 2).email)
  console.log("OOOOOOOO")
  return (
    <div className="container">
      <h2>Zamówienia</h2>
      <ProductCustomer>
        {(value) => (
          <>

            {history.map((historyItem) => (
              !historyItem.status && (
              <React.Fragment>
                <div className='row'>
                                <div className='col-10 max-auto col-lg-6'>
                                {/* {formattedTimestamp} */}
                                {users.find(item => item.pk === historyItem.user).email}
                                {/* {users.find(item => item.pk === 2).email} */}
                                {/* {historyItem.user} */}
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
                       <hr  style={{ borderTopWidth: '2px' }}></hr>                     
                      {/* <hr style={{ borderTopWidth: '5px' }}></hr> */}
                  <div className='container-fluid text-center '>
                      <div className='row '>
                      <div className='col-10 max-auto col-lg-6'>
                                <img
                                  style={{ width: '60%', height: 'auto' }} // Ustawiamy szerokość na 100% i wysokość na auto
                                  src={value.zwracanieProduktuHistoria(produkt.item).photo_url}
                                  className='img-fluid'
                                  alt={value.zwracanieProduktuHistoria(produkt.item).nazwa}
                                />
                              </div>
                          <div className='col-10 max-auto col-lg-2 '>
                              {value.zwracanieProduktuHistoria(produkt.item).nazwa}
                          </div>

                          <div className='col-10 max-auto col-lg-2'>
                              <span style={{ marginLeft: '10px' }}><span style={{ marginRight: '10px' }}>{produkt.qty}</span></span>
                          </div>

                      </div>
                  </div>
                  
                  </React.Fragment>
                    ))}
                    <div className="col-12 text-center">
                        <button
                            className="btn btn-primary btn-block"
                            onClick={() => Zrobione(historyItem)}
                            style={{ marginTop: '20px' }}
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
