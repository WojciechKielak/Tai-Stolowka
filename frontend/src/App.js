import React from 'react';
import HomePage from './Pages/HomePage';
import LoginPage  from './Pages/LoginPage';
import PrivateRoute from './Utils/PrivateRoute';
import { AuthProvider } from './Context/AuthContext'
import { Routes, Route } from 'react-router-dom';

function App() {
return(
    <div className="App">
    <AuthProvider>
    <Routes>
        <Route path="/" element={<PrivateRoute />} >
        <Route index element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
    </Routes>
    </AuthProvider>
    </div>
);
}

export default App;