import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    }
  },
});

export const { setUser, logout } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/users', {
      params: { email: credentials.email, password: credentials.password }
    });
    if (response.data.length > 0) {
      dispatch(setUser(response.data[0]));
    } else {
      alert('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error', error);
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    await axios.post('http://localhost:5000/users', userData);
    dispatch(setUser(userData));
  } catch (error) {
    console.error('Registration error', error);
  }
};

export default authSlice.reducer;