import React, {useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import AuthContext from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div> 
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand style={{ fontSize: '30px' }}>Stołówka szkolna</Navbar.Brand>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'70px' , marginBlockEnd:'70px', marginLeft:'20px'}}>
        <FontAwesomeIcon icon={faUtensils} style={{ fontSize: '150px',color:'white' }} />
      </div>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-center" >
            <div >
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