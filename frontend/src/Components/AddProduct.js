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
    formField.append('nazwa', nazwa);
    formField.append('opis', opis);
    formField.append('cena', cena);
    formField.append('photo', photo, photo.name);
    formField.append('wkoszyku', 1);
    formField.append('licznik', 1);
    console.log(photo)
    const storedData = localStorage.getItem('tokens');
    const parsedData = JSON.parse(storedData);
    if (parsedData) {
      const requestOptions = {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
          //'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${parsedData.access}`,
        },
        body: formField,//JSON.stringify(newMealData)
      };
      try {
        const response = await fetch('http://localhost:8000/meals/', requestOptions);
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