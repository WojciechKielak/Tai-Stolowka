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
import AddProduct from './Components/AddProduct';
import HistoryList from './Components/HistoryList';
import UserList from './Components/UserList';
import AddUser from './Components/AddUser';
import NavEmployee from './Components/NavEmployee';
import PrivateRouteEmployee from './Utils/PrivateRouteEmployee';
import EditMeal from './Components/EditMeal';

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
            <Route path="/history" element={<div><Nav /><HistoryList /></div>} />
          </Route>

          <Route path="/employee" element={<PrivateRouteEmployee  />} >
            <Route index element={<div><NavEmployee /><Mmeals /></div>} />
            <Route path="/employee/addproduct" element={<div><NavEmployee /><AddProduct /></div>} />
            <Route path="/employee/editmeal" element={<div><NavEmployee /><EditMeal /></div>} />
          </Route>

          <Route path="/admin" element={<PrivateRouteAdmin  />} >
            <Route index element={<div><NavAdmin /><UserList /></div>} />
            <Route path="/admin/adduser" element={<div><NavAdmin /><AddUser /></div>} />
          </Route>
          

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
