import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const GetUsers = () => {

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
          console.log(usersData);
    
        } catch (error) {
          console.error(error);
        }
      };
    

  return (
    <div className="container">
      
    </div>
  );
};

export default GetUsers;