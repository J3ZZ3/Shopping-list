import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, editProfile } from '../features/profileSlice';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const userId = useSelector((state) => state.auth.user?.id);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cell, setCell] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setSurname(profile.surname);
      setEmail(profile.email);
      setCell(profile.cell);
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProfile(userId, { name, surname, email, password, cell }));
    alert('Profile updated!');
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Surname:</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Cell Number:</label>
          <input
            type="text"
            value={cell}
            onChange={(e) => setCell(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
