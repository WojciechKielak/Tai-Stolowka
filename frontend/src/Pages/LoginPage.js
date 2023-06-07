import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'; 
import AuthContext from '../Context/AuthContext';

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div> 
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand style={{ fontSize: '30px' }}>Stołówka szkolna</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <div className="center">
             <form onSubmit={loginUser}>
                <div>
                    <span style={{ float: 'left' ,marginTop: '50px' }}>
                    <input type="text" name="username" placeholder="Wprowadź nazwę" />
                    </span>                   
                </div>

                <div>
                    <span style={{ float: 'left' ,marginTop: '20px' }}>
                    <input type="password" name="password" placeholder="Wprowadź hasło" />
                    </span>                
                </div>
                
                <span style={{ float: 'left' ,marginTop: '20px' }}>
                <input type="submit" value="Zaloguj się"/>
                </span>
                
            </form>
            </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        </div>
    )
}

export default LoginPage