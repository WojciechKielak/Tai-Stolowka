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
      localStorage.setItem('successMessage', 'Użytkownik został usunięty z bazy');
    } catch (error) {
      console.error(error);
      localStorage.setItem('Error', 'Błąd podczas usuwania użytkownika');
    }
    window.location.reload();
  };
  // wyswietlanie = () => {
  //   console.log('componentDidMount');
  //   // toast.success("SSSSSSSSSSSSSSSSSSSSSSSS", { duration: 4000 });
    const successMessage = localStorage.getItem('successMessage');
    const errorMessage = localStorage.getItem('Error');
    if (successMessage) {
      toast.success(successMessage, { duration: 4000 });
      localStorage.removeItem('successMessage');
    }
    if (errorMessage) {
        toast.error(errorMessage, { duration: 4000 });
        localStorage.removeItem('Error');
      }
  // };
  console.log('componentDidMount');
    // toast.success("SSSSSSSSSSSSSSSSSSSSSSSS", { duration: 4000 });
    
  return (
    <div className="container">
      {/* <h2>Użytkownicy</h2> */}
      {/* <div className="d-flex justify-content-end">
        
        <Link to="/admin/adduser">
          <Button>Dodaj nowego użytkownika</Button>
        </Link>
      </div> */}
      <div className='row' style={{ fontSize: '20px', marginTop:'30px' }}>

                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Email</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Rola</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-2 text-center'>
                                        <strong>Usuń użytkownika</strong>
                                    </div>
                                    <div className='col-10 max-auto col-lg-6 text-center'>
                                    <Link to="/admin/adduser">
                                    <Button style={{ backgroundColor: 'grey', borderColor: "grey" ,fontSize: '19px' }}>Dodaj nowego użytkownika</Button>
                                    </Link>
                                    </div>
                                </div>
      {users.map((user) => (
        <React.Fragment>
          <div className="container-fluid text-center"></div>
          <hr style={{ borderTopWidth: '2px' }}></hr>
          <div className="container-fluid text-center" style={{ fontSize: '20px' }}>
            <div className="row">
              <div className="col-10 max-auto col-lg-2">{user.email}</div>
              <div className="col-10 max-auto col-lg-2">{user.role}</div>

              <div className="col-10 max-auto col-lg-2">
              <button
                className="btn btn-primary btn-block"
                onClick={() => handleDelete(user)}
                style={{ backgroundColor: 'grey', borderColor: "grey" ,fontSize: '17px' }}
              >
                usuń
              </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      <Toaster />
    </div>
  );
};

export default UserList;