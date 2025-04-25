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

  return (
    <div className="my-4">
      <label className="form-label">Categories</label>

      <div className="w-100">
        {categories.map((category, i) => (
          <div
            key={i}
            className="d-flex justify-content-between align-items-center border p-2 rounded my-1"
          >
            {category}
          </div>
        ))}
      </div>

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
          Add
        </button>
      </div>
    </div>
  );
};

export default CategoryManager;

