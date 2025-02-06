import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists, removeList, searchLists } from "../features/shoppingListSlice";
import { Link, useSearchParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./ShoppingList.css";
import ItemDetail from './ItemDetail';
import ItemCard from './ItemCard';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.shoppingList.lists);
  const userId = useSelector((state) => state.auth.user?.id);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Predefined categories (matching AddEditShoppingList)
  const categories = [
    'all',
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

  // Category placeholder images
  const categoryImages = {
    'Groceries': 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200',
    'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=200',
    'Clothing': 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=200',
    'Home & Garden': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=200',
    'Books': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=200',
    'Sports & Outdoors': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=200',
    'Health & Beauty': 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=200',
    'Toys & Games': 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=200',
    'Pet Supplies': 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=200',
    'Office Supplies': 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=200',
    'Other': 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=200'
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchLists(userId));
    }
  }, [dispatch, userId]);

  const handleDelete = (id) => {
    dispatch(removeList(id));
  };

  
  const getImageAsBase64 = (url, callback) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      callback(dataURL, img.width, img.height);
    };
    img.src = url;
  };

  
  const downloadShoppingListAsPDF = (id) => {
    const doc = new jsPDF();
    const list = lists.find((list) => list.id === id);

    
    doc.text("Shopping List", 20, 20);

    
    if (list.image) {
      getImageAsBase64(list.image, (base64Image, imgWidth, imgHeight) => {
        const maxWidth = 50; 
        const maxHeight = 50; 

        
        let scaleFactor = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);

        
        let scaledWidth = imgWidth * scaleFactor;
        let scaledHeight = imgHeight * scaleFactor;

        doc.addImage(base64Image, "PNG", 20, 40, scaledWidth, scaledHeight);

        const textXPosition = 90; 
        const textYPosition = 40;

        doc.text(`Name: ${list.name}`, textXPosition, textYPosition);
        doc.text(`Quantity: ${list.quantity}`, textXPosition, textYPosition + 10);
        doc.text(`Category: ${list.category}`, textXPosition, textYPosition + 20);
        doc.text(`Notes: ${list.notes}`, textXPosition, textYPosition + 30);

        
        doc.save(`${list.name}-shopping-list.pdf`);
      });
    } else {
      doc.text(`Name: ${list.name}`, 20, 40);
      doc.text(`Quantity: ${list.quantity}`, 20, 50);
      doc.text(`Category: ${list.category}`, 20, 60);
      doc.text(`Notes: ${list.notes}`, 20, 70);

      doc.save(`${list.name}-shopping-list.pdf`);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchParams({ search: value });
    dispatch(searchLists(value));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter lists based on selected category
  const filteredLists = lists.filter(list => 
    selectedCategory === "all" || list.category === selectedCategory
  );

  const getItemImage = (list) => {
    return list.image || categoryImages[list.category] || categoryImages['Other'];
  };

  const handleItemClick = (list) => {
    setSelectedItem(list);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          Shopping List App
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link active">
            Home
          </Link>
          <Link to="/add" className="navbar-link">
            Add Item
          </Link>
        </div>
      </nav>
      <div className="container">
        <h2 className="heading">Shopping Lists</h2>
        <div className="empty-message">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name..."
          />
        </div>
        <div className="filter-section">
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>
        <div className="add-button">
          <Link to="/add">Add New List</Link>
        </div>
        <ul>
          {filteredLists.map((list) => (
            <ItemCard
              key={list.id}
              item={list}
              onClick={handleItemClick}
              getItemImage={getItemImage}
              categoryImages={categoryImages}
            />
          ))}
        </ul>

        {selectedItem && (
          <ItemDetail
            item={selectedItem}
            onClose={handleCloseDetail}
            onDelete={handleDelete}
            getItemImage={getItemImage}
            categoryImages={categoryImages}
          />
        )}
      </div>
    </>
  );
};

export default ShoppingList;
