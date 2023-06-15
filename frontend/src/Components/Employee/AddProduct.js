import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

const AddProduct = () => {

  const [nazwa, setNazwa] = useState(null);
  const [opis, setOpis] = useState(null);
  const [cena, setCena] = useState(null);
  const [photo, setPhoto] = useState(null);

  const AddNewProduct = async () => {
   
    if(nazwa && opis && cena && photo){
      const formField = new FormData();
    formField.append('nazwa', nazwa);
    formField.append('opis', opis);
    formField.append('cena', cena);
    formField.append('photo', photo, photo.name);
    const storedData = localStorage.getItem('tokens');
    const parsedData = JSON.parse(storedData);
    if (parsedData) {
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedData.access}`,
        },
        body: formField,
      };
      try {
        const response = await fetch('http://localhost:8000/meals/', requestOptions);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
        localStorage.setItem('successMessage', 'Produkt dodany do bazy');
        window.location.href = '/employee'

      } catch (error) {
        console.error(error);
        localStorage.setItem('Error', 'Błąd podczas dodawania produktu');
        window.location.href = '/employee';
      }
      
    }
    }else toast.error("Uzupełnij wszystkie dane!", { duration: 4000 });
  };

  return (
    <div className="container">
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h1 className="text-center mb-4" >Dodaj Danie</h1>

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
          <label style={{marginInlineEnd:"35px", fontWeight: "bold", fontSize: "2rem" }}>Nazwa:</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Dodaj nazwę"
              name="nazwa"
              value={nazwa}
              onChange={(e) => setNazwa(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center",marginTop: "20px" }}>
          <label style={{marginInlineEnd:"65px", fontWeight: "bold", fontSize: "2rem" }}>Opis:</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Dodaj opis :D"
              name="opis"
              value={opis}
              onChange={(e) => setOpis(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center",marginTop: "20px" }}>
          <label style={{marginInlineEnd:"60px", fontWeight: "bold", fontSize: "2rem" }}>Cena:</label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="0"
              name="cena"
              value={cena}
              onChange={(e) => setCena(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center",marginTop: "20px" }}>
          <label style={{marginInlineEnd:"30px", fontWeight: "bold", fontSize: "2rem" }}>Zdjęcie:</label>
            <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
          </div>

          <div className="text-center mb-4">
          <button className="btn btn-primary btn-block" onClick={AddNewProduct} style={{ marginTop: "20px",fontSize: '17px' }}>Dodaj Danie</button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddProduct;