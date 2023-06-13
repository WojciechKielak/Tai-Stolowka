import { React, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const PrivateRoute = () => {
    let {user} = useContext(AuthContext)
    console.log(user.role); // Access the user's role
    console.log("R 1 " )
    if ( user.role === 1) {
        return <Outlet />;
    } else if( user.role === 3){
        return <Navigate to="/admin" />;
    }else if( user.role === 2){
        return <Navigate to="/employee" />;
    }else{
        return <Navigate to="/login" />;
    }

    // if (user.role === 1) {
    //     return <Outlet />;
    // } else {
    //     return <Navigate to="/login" />;
    // }
}


export default PrivateRoute;