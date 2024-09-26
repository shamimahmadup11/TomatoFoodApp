import React, { useState } from 'react';

// Main Component
function FoodShoppingListApp() {
  // State for search query and search results
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // State for the shopping list
  const [shoppingList, setShoppingList] = useState([]);
  // State for error handling
  const [error, setError] = useState(null);

  // Handle search input change and dynamically fetch results from API
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 0) {
      try {
        // Dynamically fetch the food items based on search term
        const response = await fetch(`https://api.frontendeval.com/fake/food/${query}`);

        const data = await response.json();
        console.log(data)
        setSearchResults(data); // Store search results
        setError(null);
      } catch (error) {
        setError(error.message);
        setSearchResults([]); // Clear results if there's an error
      }
    } else {
      setSearchResults([]); // Clear results if search term is empty
    }
  };

  // Add selected item to the shopping list
  const handleAddItem = (item) => {
    if (!shoppingList.includes(item)) {
      setShoppingList([...shoppingList, item]);
    }
  };

  // Delete an item from the shopping list
  const handleDeleteItem = (item) => {
    setShoppingList(shoppingList.filter((listItem) => listItem !== item));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Food Shopping List</h1>

      {/* Display error if API fetch fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}w

      {/* Search input for fetching partial matches */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for food items..."
          style={{ padding: '10px', width: '300px' }}
        />
      </div>

      {/* Display search results as clickable options */}
      {searchResults.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {searchResults.map((item, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                marginBottom: '10px',
                background: '#f4f4f4',
                cursor: 'pointer',
              }}
              onClick={() => handleAddItem(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Display shopping list */}
      <h2>Your Shopping List</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {shoppingList.length === 0 ? (
          <p>No items in your shopping list.</p>
        ) : (
          shoppingList.map((item, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                marginBottom: '10px',
                background: '#e0f7fa',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{item}</span>
              <button
                onClick={() => handleDeleteItem(item)}
                style={{
                  padding: '5px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default FoodShoppingListApp;
