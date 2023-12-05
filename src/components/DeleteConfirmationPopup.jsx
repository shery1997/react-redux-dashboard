import React from 'react';
import '../style/DeleteConfirmationPopup.css';

const DeleteConfirmationPopup = ({ onCancel, onDelete }) => {
  return (
    <div className="delete-confirmation-popup">
      <div className="popup-header">
        <span role="img" aria-label="delete-icon" className="delete-icon">🗑️</span>
        <h2>Are you sure?</h2>
      </div>
      <p>Do you really want to delete this customer? This process cannot be undone.</p>
      <div className="popup-buttons">
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
        <button className="delete-button" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
