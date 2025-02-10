import React from 'react';
import { Link } from 'react-router-dom';
import './ItemDetail.css';

const ItemDetail = ({ item, onClose, onDelete, getItemImage, categoryImages }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="modal-image-container">
          <img 
            src={getItemImage(item)} 
            alt={item.category}
            className="modal-image"
            onError={(e) => {
              e.target.src = categoryImages['Other'];
            }}
          />
        </div>
        <div className="modal-details">
          <h2>{item.name}</h2>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Notes:</strong> {item.notes || 'No notes available'}</p>
        </div>
        <div className="modal-actions">
          <Link to={`/edit/${item.id}`} className="edit-button">
            <i className="fas fa-edit"></i>
            <span>Edit</span>
          </Link>
          <button 
            onClick={() => {
              onDelete(item.id);
              onClose();
            }}
            className="delete-button"
          >
            <i className="fas fa-trash-alt"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail; 