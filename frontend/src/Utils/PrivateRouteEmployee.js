import { React, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const PrivateRouteEmployee = () => {
    let {user} = useContext(AuthContext)
    console.log(user.role); // Access the user's role
    // console.log("R 2" )
    if (user.role === 2) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}



export default PrivateRouteEmployee;