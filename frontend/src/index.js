
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './bootstrap.min.css'
import 'react-responsive-modal/styles.css'
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);