import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const DeleteUser = ({ user }) => {

    const handleDelete = async () => {
      try {
        const storedData = localStorage.getItem('tokens');
        const parsedData = JSON.parse(storedData);
        const requestOptions = {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${parsedData.access}`,
          },
        };
  
        const response = await fetch(`http://localhost:8000/api/users/${user.id}/`, requestOptions);
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
      
    </div>
  );
};

export default DeleteUser;