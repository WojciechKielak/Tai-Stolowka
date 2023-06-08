import { React, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const PrivateRoute = () => {
    let {user} = useContext(AuthContext)
    console.log(user.role); // Access the user's role
    if (user.role === 1) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default PrivateRoute;