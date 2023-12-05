// src/components/EditPopupForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editCustomer } from '../slices/customerSlice';
import '../style/EditFormPopup.css';

const EditPopupForm = ({ customer, onClose }) => {
  const dispatch = useDispatch();
  const [first_name, setFName] = useState(customer.first_name);
  const [last_name, setLName] = useState(customer.last_name);
  const [email, setEmail] = useState(customer.email);

  useEffect(() => {
    setFName(customer.first_name);
    setLName(customer.last_name);
    setEmail(customer.email);
  }, [customer]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editCustomer({ id: customer.id, first_name, last_name, email }));
    onClose(); // Close the popup
  };

  return (
    <div className="edit-popup">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>Edit The Customer</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" value={first_name} onChange={(e) => setFName(e.target.value)} required />
        <label>Last Name:</label>
        <input type="text" value={last_name} onChange={(e) => setLName(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditPopupForm;
