// src/components/CustomerTable.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../slices/customerSlice';
import '../style/CustomerTable.css';
import EditPopupForm from './EditFormPopup';
import '../style/EditFormPopup.css'
import { deleteCustomer } from '../slices/customerSlice';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';

const CustomerTable = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);
  const status = useSelector((state) => state.customer.status);
  const error = useSelector((state) => state.customer.error);
  //console.log(customers);

  
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditPopupVisible, setEditPopupVisible ] = useState( false );
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch( fetchCustomers() );
    }
  }, [status, dispatch]);

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setEditPopupVisible(true);
  };

  const handleEditPopupClose = () => {
    setSelectedCustomer(null);
    setEditPopupVisible(false);
  };

  const handleDeleteClick = (customerId) => {
    setSelectedCustomer(customerId);
    setDeletePopupVisible(true);
  };

  const handleDeletePopupCancel = () => {
    setSelectedCustomer(null);
    setDeletePopupVisible(false);
  };

  const handleDeletePopupConfirm = () => {
    dispatch(deleteCustomer(selectedCustomer));
    setDeletePopupVisible(false);
  };


  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>

    <table id="customer-table">
      <thead>
        <tr>
          <th></th>
          <th>Customer ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
          {customers.map( ( customer ) => (
          <tr key={customer.id}>
            <td>
              {typeof customer.avatar === 'object' ? 
                <img className='avatar-cell' src={URL.createObjectURL( customer.avatar )} alt="Avatar" />
                : <img className='avatar-cell' src={customer.avatar} alt="Avatar" />
              }
            </td>
            <td>{customer.id}</td>
            <td>{customer.first_name}</td>
            <td>{customer.last_name}</td>
            <td>{customer.email}</td>
            <td>
              <div id="action-buttons">
                <button className="action-button edit-button" onClick={() => handleEditClick(customer)}>Edit</button>
                <button className='delete-button' onClick={() => handleDeleteClick(customer.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      {isEditPopupVisible && (
        <EditPopupForm customer={selectedCustomer} onClose={handleEditPopupClose} />
      )}
      {isDeletePopupVisible && (
        <DeleteConfirmationPopup
          onCancel={handleDeletePopupCancel}
          onDelete={handleDeletePopupConfirm}
        />
      )}
    </div>
  );
};

export default CustomerTable;
