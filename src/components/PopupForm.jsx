// src/components/PopupForm.js
import React, { useState, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../slices/customerSlice';
import '../style/PopupForm.css'

const PopupForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [ first_name, setFName ] = useState( '' );
  const [last_name, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [ avatar, setAvatar ] = useState( '' );

  const imgRef = useRef(null);
  
  const handleFileChange = (e) => {
    // Handle the file change and store the file object
    const file = e.target.files[ 0 ];
    setAvatar( file );
    
    const reader = new FileReader();
    reader.onload = (event) => {
      imgRef.current.src = event.target.result;
    };
    reader.readAsDataURL(file);

  };
  const generateUniqueID = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000000);
    const uniqueID = timestamp + random;
  
    return uniqueID;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append( 'first_name', first_name );
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('avatar', avatar);

    // Add customer to the Redux store
    const newID = generateUniqueID();
    dispatch( addCustomer( { id: newID, first_name, last_name, email, avatar } ) );
    //console.log(name, email , photo);
    onClose(); // Close the popup
  };

  return (
    <div className="popup">
      <div className='form-header' >
      <button className="close-button" onClick={onClose}>X</button>
      <h2>Add New Customer</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Fisrt Name:</label>
        <input type="text" value={first_name} onChange={( e ) => setFName( e.target.value )} required />
        <label>Last Name:</label>
        <input type="text" value={last_name} onChange={(e) => setLName(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Upload Photo:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {avatar && (
          <img className="avatar-image" ref={imgRef} src={avatar instanceof File ? URL.createObjectURL(avatar) : avatar} alt="Preview" />
        )}
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default PopupForm;
