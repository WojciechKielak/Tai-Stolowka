import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import DeleteUser from "./DeleteUser"

import { Link, withRouter } from "react-router-dom";

const GetUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

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
      console.log(usersData)
      console.log("UUUU");
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (user) => {
    // console.log(user.)
    try {
      const storedData = localStorage.getItem('tokens');
      const parsedData = JSON.parse(storedData);
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${parsedData.access}`,
        },
      };

      const response = await fetch(`http://localhost:8000/api/users/${user.pk}/`, requestOptions);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log('User deleted successfully.');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {/* <div className='container-fluid text-center '> */}
      <h2>Użytkownicy</h2>
      <Link to="/admin/adduser">
                                        <Button>Dodaj nowego użytkownika</Button>
                                    </Link>
        {users.map((user) => (
          <React.Fragment>
            <div className='container-fluid text-center '></div>
          <hr style={{ borderTopWidth: '2px' }}></hr>
           <div className='container-fluid text-center '>
          <div className='row '>
              <div className='col-10 max-auto col-lg-2 '>
                  {user.email}                   
              </div>
              <div className='col-10 max-auto col-lg-2 '>
                  {user.role}                   
              </div>
              <button className="btn btn-primary btn-block" onClick={() => handleDelete(user)} style={{ marginTop: "20px" }}>usuń</button>


          </div>
      </div>
      </React.Fragment>

          )


          // console.log(user);
          // console.log("UUUU");
          // <li key={user.id}>{user.name}</li>
        )}

      <Toaster />
    </div>
  );
};

export default GetUsers;
