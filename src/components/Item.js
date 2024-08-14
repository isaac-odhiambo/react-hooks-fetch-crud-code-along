import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json', // Corrected 'Context-Type' to 'Content-Type'
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
    .then((r) => r.json())
    .then((updatedItem) => {
      console.log(updatedItem);
      onUpdateItem(updatedItem); // Notify the parent component of the update
    });

    console.log('clicked item:', item);
  }
  
  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => {
      console.log("deleted!");
      onDeleteItem(item); // Notify the parent component of the deletion
    });
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button
        className="remove"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </li>
  );
}

export default Item;
