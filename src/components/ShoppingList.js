import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchLists, removeList, searchLists, sortLists } from "../features/shoppingListSlice";
import { Link, useSearchParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./ShoppingList.css";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.shoppingList.lists);
  const userId = useSelector((state) => state.auth.user?.id);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

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

  const handleSort = (option) => {
    dispatch(sortLists(option));
  };

  return (
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
      <div className="sort-buttons">
        <button onClick={() => handleSort("name")}>Sort by Name</button>
        <button onClick={() => handleSort("category")}>Sort by Category</button>
      </div>
      <div className="add-button">
        <Link to="/add">Add New List</Link>
      </div>
      <ul>
        {lists.map((list) => (
          <li key={list.id} className="list-item">
            <img src={list.image} alt={list.name} className="image" />

            <div className="list-content">
              <h3 className="list-title">{list.name}</h3>
              <p>
                <strong>Quantity:</strong> {list.quantity}
              </p>
              <p>
                <strong>Category:</strong> {list.category}
              </p>
              <p>
                <strong>Notes:</strong> {list.notes}
              </p>
              <div className="action-buttons">
                <Link to={`/edit/${list.id}`}>Edit</Link>
              </div>
              <button onClick={() => handleDelete(list.id)} className="button">
                Delete
              </button>
              <br />
              <button
                onClick={() => downloadShoppingListAsPDF(list.id)}
                className="button"
              >
                Download as PDF
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
