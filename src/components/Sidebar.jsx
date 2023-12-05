// src/components/Sidebar.js
import React from 'react';
import '../style/Sidebar.css'

const Sidebar = () => {
  return (
    <div id="sidebar">
      <div id="logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <div id="customer-tab">
      <img src="/images/customersIcon.png" alt="Logo" />
        <span>Customers</span>
      </div>
    </div>
  );
};

export default Sidebar;
