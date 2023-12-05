// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AddCustomerButton from './components/AddCustomerButton';
import CustomerTable from './components/CustomerTable';
import './App.css'; // Import a global CSS file for the app layout

const App = () => {
  return (
    <div id="app-container">
      <div id="sidebar-container">
        <Sidebar />
      </div>
      <div id="main-content">
        <Header />
        <AddCustomerButton />
        <CustomerTable />
      </div>
    </div>
  );
};

export default App;
