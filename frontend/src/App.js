import React from 'react';
import LoginPage  from './Pages/LoginPage';
import PrivateRoute from './Utils/PrivateRoute';
import PrivateRouteAdmin from './Utils/PrivateRouteAdmin';
import { AuthProvider } from './Context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Nav from "./Components/User/Nav";
import Productlist from './Components/User/Productlist';
import Details from './Components/User/Details';
import Pay from './Components/User/Pay';
import Cart from './Components/User/Cart';
import MealList from './Components/Employee/MealList';
import NavAdmin from './Components/Admin/NavAdmin';
import AddProduct from './Components/Employee/AddProduct';
import HistoryList from './Components/User/HistoryList';
import UserList from './Components/Admin/UserList';
import AddUser from './Components/Admin/AddUser';
import NavEmployee from './Components/Employee/NavEmployee';
import PrivateRouteEmployee from './Utils/PrivateRouteEmployee';
import EditMeal from './Components/Employee/EditMeal';
import Orders from './Components/Employee/Orders';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute />} >
            <Route index element={<div><Nav /><Productlist /></div>} />
            <Route path="/details" element={<div><Nav /><Details /></div>} />
            <Route path="/cart" element={<div><Nav /><Cart /></div>} />
            <Route path="/pay" element={<div><Nav /><Pay /></div>} />
            <Route path="/history" element={<div><Nav /><HistoryList /></div>} />
          </Route>

          <Route path="/employee" element={<PrivateRouteEmployee  />} >
            <Route index element={<div><NavEmployee /><MealList /></div>} />
            <Route path="/employee/addproduct" element={<div><NavEmployee /><AddProduct /></div>} />
            <Route path="/employee/editmeal" element={<div><NavEmployee /><EditMeal /></div>} />
            <Route path="/employee/orders" element={<div><NavEmployee /><Orders /></div>} />
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
