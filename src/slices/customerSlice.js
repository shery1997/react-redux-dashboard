// src/slices/customerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Async thunk for fetching customers from an API
export const fetchCustomers = createAsyncThunk('customer/fetchCustomers', async () => {
  try {
    const response = await axios.get('https://reqres.in/api/users?page=1');
    return response.data.data; // Assuming the response has a 'data' property containing an array of customers
  } catch (error) {
    throw error;
  }
});

const initialState = {
  customers: [],
  status: 'idle',
  error: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: ( state, action ) => {
      console.log(action.payload);
      state.customers.push(action.payload);
    },
    editCustomer: (state, action) => {
      state.status = 'succeeded';
      const { id, first_name, last_name, email } = action.payload;
      const index = state.customers.findIndex((customer) => customer.id === id);
      if (index !== -1) {
        // Update the properties of the existing customer at the found index
        state.customers[index].first_name = first_name;
        state.customers[index].last_name = last_name;
        state.customers[index].email = email;
        console.log( state.customers[index] );
        // Update other properties as needed
      }
    },
    deleteCustomer: (state, action) => {
      state.status = 'succeeded';
      const idToDelete = action.payload;
      state.customers = state.customers.filter(customer => customer.id !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {editCustomer, addCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice.reducer;
