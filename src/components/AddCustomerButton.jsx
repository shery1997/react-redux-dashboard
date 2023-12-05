// src/components/AddCustomerButton.js
import React, { useState } from 'react';
import PopupForm from './PopupForm.jsx';
import '../style/AddCustomerButton.css'


const AddCustomerButton = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <button id="add-customer-btn" onClick={openPopup}>
        + Add new customer
      </button>
      {isPopupOpen && <PopupForm onClose={closePopup} />}
    </div>
  );
};

export default AddCustomerButton;
