import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import {ProductProvider } from "./contexAPI";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <ProductProvider>
    <Router>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </Router>
  </ProductProvider>,
  document.getElementById("root")
)

