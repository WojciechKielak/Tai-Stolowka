import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { ProductCustomer } from '../contexAPI';

const EditMeal = () => {
  const navigate = useNavigate();
  const [nazwa, setNazwa] = useState(null);
  const [opis, setOpis] = useState(null);
  const [cena, setCena] = useState(null);
  const [photo, setPhoto] = useState(null);

  const AddNewProduct = async (produkt) => {
   
    if( nazwa || opis || cena || photo){
      const formField = new FormData();

    
    if (nazwa ) {
      formField.append('nazwa', nazwa);
    }
    if ( opis ) {
      formField.append('opis', opis);
    }
    if (cena ) {
      formField.append('cena', cena);
    }
    if ( photo ) {
      formField.append('photo', photo, photo.name);
    }

    console.log(formField)
    const storedData = localStorage.getItem('tokens');
    const parsedData = JSON.parse(storedData);
    if (parsedData) {
      const requestOptions = {
        method: 'PUT',
        //mode: 'no-cors',
        headers: {
          //'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${parsedData.access}`,
        },
        body: formField,//JSON.stringify(newMealData)
      };
      try {
        const response = await fetch(`http://localhost:8000/meals/${produkt.pk}/`, requestOptions);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
        localStorage.setItem('successMessage', 'Zmodyfiwkowano produkt');
        window.location.href = '/employee';
      } catch (error) {
        console.error(error);
        localStorage.setItem('Error', 'Błąd podczas modyfikacji produktu');
        window.location.href = '/employee';
      }
    }
      
    }else{
      toast.error("Wprowadź jakąś zianę", { duration: 8000 });
    }
  };

  
  return (
    <ProductCustomer>
      {(value) => {
console.log(value.br())
console.log("sasasas")
        return (
          <div className="container">
            <div className="container">
              <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Modyfikuj Danie</h2>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ marginInlineEnd: '35px', fontWeight: 'bold', fontSize: '2rem' }}>Nazwa:</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={value.br().nazwa}
                    name="nazwa"
                    value={nazwa}
                    onChange={(e) => { console.log(e.target.value);setNazwa(e.target.value)}}
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
                <button className="btn btn-primary btn-block" onClick={() => AddNewProduct(value.br())} style={{ marginTop: '20px' }}>
                  Zaktualizuj Danie
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
