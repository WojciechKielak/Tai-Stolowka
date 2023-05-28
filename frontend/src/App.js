import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./Components/Nav";
import Productlist from './Components/Productlist';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Details from './Components/Details';
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import Cart from './Components/Cart';
import Pay from './Components/Pay';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL:'http://127.0.0.1:8000'
});

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    client.get("/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);
  const navigate = useNavigate();
  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/login",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
      navigate('/products');
    });
    
  }

  if (currentUser)
  {
    return (
      <div className="App">
      <Nav/>
      <Routes>
          <Route path="/products" element={<Productlist />} />
          <Route path="/details" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pay" element={<Pay/>} />
      </Routes>
     </div> 
    );
  }
  return (
    <div>
      
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Stołówka szkolna</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" >
              Submits
            </Button> 

          </Form>
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </div>
  );

  //  return (
  //   <div className="App">
  //     <Nav/>
      
  //     <Routes>
  //         <Route path='/' element ={<Productlist />}/>
  //         <Route path='/details' element ={<Details />}/>
  //     </Routes> 

      
  //     {/* <Route path = "/" component={Nav}/> 
  //     <Switch>
  //       <Route exact path='/' component ={Productlist}/>
  //     </Switch>  */}
  //    </div> 
  //  ); 
}

export default App;