import { React, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const PrivateRouteAdmin = () => {
    let {user} = useContext(AuthContext)
    console.log(user.role); // Access the user's role
    console.log("ALLOWAAAAAAAAAAAAAAA " )
    if (user.role === 2) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}



export default PrivateRouteAdmin;