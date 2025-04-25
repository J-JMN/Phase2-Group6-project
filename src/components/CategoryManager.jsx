// src/components/CategoryManager.jsx
import React, { useState } from "react";

const CategoryManager = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    const name = newCategory.trim();
    if (!name) return;
    if (categories.includes(name)) return;
    setCategories([...categories, name]);
    setNewCategory("");
  };

  const removeCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <div className="my-4">
      <label className="form-label">Categories</label>

      {/* List of categories with Remove buttons */}
      <div className="w-100">
        {categories.map((category, i) => (
          <div
            key={i}
            className="d-flex justify-content-between align-items-center border p-2 rounded my-1"
          >
            <span>{category}</span>
            <button
              type="button"
              className="btn btn-sm btn-secondary custom-bg-secondary"
              onClick={() => removeCategory(i)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Input to add a new category */}
      <div className="d-flex mt-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-sm btn-secondary custom-bg-secondary"
          onClick={addCategory}
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default CategoryManager;

