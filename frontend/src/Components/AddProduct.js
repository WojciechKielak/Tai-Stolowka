import React, { useState } from 'react';
import { useHistory, useNavigate  } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {
  const navigate = useNavigate();

  const [nazwa, setNazwa] = useState(null);
  const [opis, setOpis] = useState(null);
  const [cena, setCena] = useState(null);
  const [photo, setPhoto] = useState(null);

  const AddNewProduct = async () => {
    const formField = new FormData();
    // let formField = new FormData();
    formField.append('nazwa', nazwa);
    formField.append('opis', opis);
    formField.append('cena', cena);
 console.log(nazwa)
 console.log("FFFFFFFFFFF")
    if (photo !== null) {
      formField.append('photo', photo);
    }

    const storedData = localStorage.getItem('tokens');
    const parsedData = JSON.parse(storedData);
    if (parsedData) {
        axios.put('http://localhost:8000/meals',formField, {
          headers: {
            Authorization: `Bearer ${parsedData.access}`,
          },
        })
        //   .then(res => {
        //     const data = res.data;
        //     this.setState({
        //       details: data,
        //     });
        //     console.log("AAAAAAAAAAAA")
        //   })
          .catch(err => {
            // Handle error
            console.error(err);
          });
      } else {
        // Handle the case when the access token is null or not available
        console.error('Access token is missing or invalid.');
        // Perform appropriate action, e.g., show an error message or redirect to login page
      }
    // if (parsedData) {
    //   try {
    //     const response = await axios.put('http://localhost:8000/meals', formField, {
    //       headers: {
    //         Authorization: `Bearer ${parsedData.access}`,
    //       },
    //     });
    //     const data = response.data;
    //     console.log(data);
    //     navigate('/');
    //   } catch (error) {
    //     // console.error(error);
    //     console.error(error.response.data);
    //   }
    // } else {
    //   console.error('Access token is missing or invalid.');
    //   // Perform appropriate action, e.g., show an error message or redirect to login page
    // }
  };

  return (
    <div className="container">
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Dodaj Danie</h2>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Dodaj nazwę"
              name="nazwa"
              value={nazwa}
              onChange={(e) => setNazwa(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Dodaj opis :D"
              name="opis"
              value={opis}
              onChange={(e) => setOpis(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="0"
              name="cena"
              value={cena}
              onChange={(e) => setCena(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
          </div>

          <button className="btn btn-primary btn-block" onClick={AddNewProduct}>Dodaj Danie</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;