import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createList, editList } from '../features/shoppingListSlice';
import { useNavigate, useParams } from 'react-router-dom';

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
    
    navigate('/');
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
    <div>
      <h2>{id ? 'Edit Shopping List' : 'Add Shopping List'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Notes (optional):</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div>
          <label>Image (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        {image && (
          <div>
            <img src={image} alt="Preview" style={{ width: '100px', height: '100px' }} />
          </div>
        )}
        <button type="submit">{id ? 'Update' : 'Add'} List</button>
      </form>
    </div>
  );
};

export default AddEditShoppingList;