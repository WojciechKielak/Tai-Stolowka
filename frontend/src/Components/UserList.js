import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const UserList = () => {
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
      console.log(usersData);
      console.log('UUUU');
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (user) => {
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
      <h2>Użytkownicy</h2>
      <Link to="/admin/adduser">
        <Button>Dodaj nowego użytkownika</Button>
      </Link>
      {users.map((user) => (
        <React.Fragment>
          <div className="container-fluid text-center"></div>
          <hr style={{ borderTopWidth: '2px' }}></hr>
          <div className="container-fluid text-center">
            <div className="row">
              <div className="col-10 max-auto col-lg-2">{user.email}</div>
              <div className="col-10 max-auto col-lg-2">{user.role}</div>
              <div className="col-10 max-auto col-lg-2">
              <button
                className="btn btn-primary btn-block"
                onClick={() => handleDelete(user)}
                style={{ marginTop: '20px' }}
              >
                usuń
              </button></div>
            </div>
          </div>
        </React.Fragment>
      ))}
      <Toaster />
    </div>
  );
};

export default UserList;