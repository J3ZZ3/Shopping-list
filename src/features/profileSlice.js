import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const { setProfile, updateProfile } = profileSlice.actions;

export const fetchProfile = (userId) => async (dispatch) => {
  const response = await axios.get(`http://localhost:5000/users/${userId}`);
  dispatch(setProfile(response.data));
};

export const editProfile = (userId, profileData) => async (dispatch) => {
  await axios.patch(`http://localhost:5000/users/${userId}`, profileData);
  dispatch(updateProfile(profileData));
};

export default profileSlice.reducer;