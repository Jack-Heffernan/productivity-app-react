import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Nav from './Navbar'
import Sidebar from './Sidebar'
import Modal from './Modal'
import Register from './Register'
import Login from './Login'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="flex h-screen">
      <Modal />
      <Sidebar />
      <div className="flex-1">
        <App />
      </div>
    </div>
  </React.StrictMode>
);



