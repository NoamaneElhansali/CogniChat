import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Signup } from './login/signup';
import { Home } from './pages/home';
import { Provider } from 'react-redux';
import store from './pages/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />

    
);

reportWebVitals();
