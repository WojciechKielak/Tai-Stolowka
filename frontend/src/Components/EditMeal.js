import React, { useState } from 'react';
import { ProductCustomer } from '../contexAPI';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

const EditMeal = () => {
    const [nazwa, setNazwa] = useState(null);
    const [opis, setOpis] = useState(null);
    const [cena, setCena] = useState(null);
    const [photo, setPhoto] = useState(null);
  
    const AddNewProduct = async (produkt) => {
     
      const formField = new FormData();
      formField.append('nazwa', nazwa);
      formField.append('opis', opis);
      formField.append('cena', cena);
      // formField.append('photo', photo, photo.name);
      if (photo !== null) {
        formField.append('photo', photo, photo.name);
      }
      formField.append('wkoszyku', 1);
      formField.append('licznik', 1);
      console.log(photo)
      console.log("photo")
      console.log(produkt)
      

  };

  const updtMealValues = async (produkt) => {
    const formField = new FormData();
    if( nazwa !== null )formField.append('nazwa', nazwa);
    if( opis !== null )formField.append('opis', opis);
    if (cena !== null)formField.append('cena', cena);
    if (photo !== null)formField.append('photo', photo, photo.name);

    const storedData = localStorage.getItem('tokens');
    const parsedData = JSON.parse(storedData);
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${parsedData.access}`,
      },
      body: formField,
    };
  
    try {
      const response = await fetch(`http://localhost:8000/meals/${produkt.pk}/`, requestOptions);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const updatedMeal = await response.json();
      console.log(updatedMeal);
      return updatedMeal;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <ProductCustomer>
      {(value) => {
        // const { nazwa, opis, cena, photo_url } = value.br();
        let naz = value.br().nazwa;
console.log(value.br())
console.log("sasasas")
        return (
          <div className="container">
            <div className="container">
              <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Dodaj Danie</h2>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ marginInlineEnd: '35px', fontWeight: 'bold', fontSize: '2rem' }}>Nazwa:</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={value.br().nazwa}
                    name="nazwa"
                    value={nazwa}
                    onChange={(e) => setNazwa(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                  <label style={{ marginInlineEnd: '65px', fontWeight: 'bold', fontSize: '2rem' }}>Opis:</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Dodaj opis :D"
                    name="opis"
                    value={opis}
                    onChange={(e) => setOpis(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                  <label style={{ marginInlineEnd: '60px', fontWeight: 'bold', fontSize: '2rem' }}>Cena:</label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder={value.br().cena}
                    name="cena"
                    value={cena}
                    onChange={(e) => setCena(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                  <label style={{ marginInlineEnd: '30px', fontWeight: 'bold', fontSize: '2rem' }}>Zdjęcie:</label>
                  <input type="file" className="form-control"  onChange={(e) => setPhoto(e.target.files[0])} />
                </div>

                {/* <button className="btn btn-primary btn-block" onClick={AddNewProduct(value.br())} style={{ marginTop: '20px' }}> */}
                <button className="btn btn-primary btn-block" onClick={() => updtMealValues(value.br())} style={{ marginTop: '20px' }}>
                  Dodaj Danie
                </button>
              </div>
            </div>
            <Toaster />
          </div>
        );
      }}
    </ProductCustomer>
  );
};

export default EditMeal;
