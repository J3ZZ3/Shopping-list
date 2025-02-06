import React from 'react';
import './ItemCard.css';

const ItemCard = ({ item, onClick, getItemImage, categoryImages }) => {
  return (
    <li className="list-item" onClick={() => onClick(item)}>
      <img 
        src={getItemImage(item)} 
        alt={item.category}
        className="item-image"
        onError={(e) => {
          e.target.src = categoryImages['Other'];
        }}
      />
      <div className="list-content">
        <h3 className="list-title">{item.name}</h3>
        <p>
          <strong>Quantity:</strong> {item.quantity}
        </p>
        <p>
          <strong>Category:</strong>&nbsp;&nbsp;{item.category}
        </p>
      </div>
    </li>
  );
};

export default ItemCard; 