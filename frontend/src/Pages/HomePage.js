import { React, Route, Routes} from 'react';
//import AuthContext from '../Context/AuthContext';
import  Nav from '../Components/Nav';
import Productlist from '../Components/Productlist';

const HomePage = () => {
    return (
    <div className="App">
      <Nav/>
      <h1>HOME PAGE</h1>
      
     </div> 
    );
};

export default HomePage