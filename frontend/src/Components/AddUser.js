import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const AddUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [role, setRole] = useState(1);

  const AddNewUser = async () => {
   
    if(email && password1 && password2){
      const formField = new FormData();
    formField.append('email', email);
    formField.append('password', password1);
    formField.append('role', role);

    if(password1 === password2)
    {
      const storedData = localStorage.getItem('tokens');
      const parsedData = JSON.parse(storedData);
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedData.access}`,
        },
        body: formField,
      };
      try {
        const response = await fetch('http://localhost:8000/api/create-user/', requestOptions);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        localStorage.setItem('successMessage', 'Użytkownik dodany do bazy');
        window.location.href = '/admin';

      } catch (error) {
        console.error(error);
        localStorage.setItem('Error', 'Błąd podczas dodawania użytkownika do bazy');
        window.location.href = '/admin';
      }
    
    }else{
      toast.error("Błędne hasło", { duration: 4000 });
    }
    }else toast.error("Uzupełnij wszystkie dane!", { duration: 4000 });
  };

  return (
    <div className="container">
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h1 className="text-center mb-4">Dodaj Użytkownika</h1>

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
           <label style={{marginInlineEnd:"134px", fontWeight: "bold", fontSize: "2rem" }}>Email:</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Podaj email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center",marginTop: "20px" }}>
          <label style={{ marginInlineEnd:"131px", fontWeight: "bold", fontSize: "2rem" }}>Hasło:</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Podaj hasło"
              name="password1"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center",marginTop: "20px" }}>
          <label style={{ marginRight: "20px", whiteSpace: "nowrap", fontWeight: "bold", fontSize: "2rem" }}>Powtórz hasło:</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Potwierdź hasło"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          
          <div className="form-group" style={{ display: "flex", alignItems: "center",marginTop: "20px" }}>
          <label style={{ marginRight: "149px", fontWeight: "bold", fontSize: "2rem" }}>Rola:</label>
            <select
              className="form-control form-control-lg"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
            <option value={1}>uczeń</option>
            <option value={2}>pracownik</option>
            <option value={3}>administrator</option>
            </select>
          </div>

          <div className="text-center mb-4">
          <button className="btn btn-primary btn-block" onClick={AddNewUser} style={{ marginTop: "20px" ,backgroundColor: 'grey', borderColor: "grey",fontSize: '17px'}}>Dodaj użytkownika</button>
          </div>

          
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddUser;