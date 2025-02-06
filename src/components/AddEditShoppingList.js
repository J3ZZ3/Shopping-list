import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createList, editList } from '../features/shoppingListSlice';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEditShoppingList.css';

const AddEditShoppingList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lists = useSelector((state) => state.shoppingList.lists);
  const userId = useSelector((state) => state.auth.user?.id);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);

  // Predefined categories
  const categories = [
    'Groceries',
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Books',
    'Sports & Outdoors',
    'Health & Beauty',
    'Toys & Games',
    'Pet Supplies',
    'Office Supplies',
    'Other'
  ];

  useEffect(() => {
    if (id) {
      const list = lists.find((list) => list.id === parseInt(id));
      if (list) {
        setName(list.name);
        setQuantity(list.quantity);
        setCategory(list.category);
        setNotes(list.notes);
        setImage(list.image);
      }
    }
  }, [id, lists]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = { name, quantity, category, notes, image, userId };
    
    if (id) {
      dispatch(editList(id, newList));
    } else {
      dispatch(createList(newList));
    }
    navigate('/home');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add-edit-container">
      <h2 className="heading">{id ? 'Edit Item' : 'Add Item'}</h2>
      <form onSubmit={handleSubmit} className="add-edit-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
            placeholder="Enter list name"
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="form-input"
            placeholder="Enter quantity"
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="form-select"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-textarea"
            placeholder="Add any additional notes"
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={image || ''}
            onChange={(e) => setImage(e.target.value)}
            className="form-input"
            placeholder="Enter image URL"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            {id ? 'Update List' : 'Create List'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/home')} 
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditShoppingList;