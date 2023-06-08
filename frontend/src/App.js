import React from 'react';
import HomePage from './Pages/HomePage';
import LoginPage  from './Pages/LoginPage';
import PrivateRoute from './Utils/PrivateRoute';
import PrivateRouteAdmin from './Utils/PrivateRouteAdmin'; // Dodaj import
import { AuthProvider } from './Context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Nav from "./Components/Nav";
import Productlist from './Components/Productlist';
import Details from './Components/Details';
import Pay from './Components/Pay';
import Cart from './Components/Cart';
import Mmeals from './Components/Mmeals';
import NavAdmin from './Components/NavAdmin';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute />} >
            <Route index element={<HomePage />} />
            <Route path="/products" element={<div><Nav /><Productlist /></div>} />
            <Route path="/details" element={<div><Nav /><Details /></div>} />
            <Route path="/cart" element={<div><Nav /><Cart /></div>} />
            <Route path="/pay" element={<div><Nav /><Pay /></div>} />
          </Route>

          <Route path="/admin" element={<PrivateRouteAdmin  />} >
            <Route index element={<div><NavAdmin /><Mmeals /></div>} />
            <Route path="/admin/details" element={<div><NavAdmin /><Details /></div>} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
