import React, { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("todos"));

    if (savedItems) {
      setItems(savedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  function handleChange(event) {
    setInputText(event.target.value);
  }

  function addItem() {
    if (inputText.trim() === "") return;

    setItems([...items, { text: inputText, completed: false }]);
    setInputText("");
  }

  function deleteItem(indexToDelete) {
    setItems(items.filter((item, index) => index !== indexToDelete));
  }

  function toggleComplete(indexToToggle) {
    setItems(
      items.map((item, index) =>
        index === indexToToggle ? { ...item, completed: !item.completed } : item
      )
    );
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" value={inputText} onChange={handleChange} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              <span onClick={() => toggleComplete(index)}>{item.text}</span>

              <button className="delete-btn" onClick={() => deleteItem(index)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
