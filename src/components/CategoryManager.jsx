import { useState } from "react";
import useCategories from "../hooks/useCategories";

const CategoryManager = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState("");
  const { addCategory, removeCategory } = useCategories(categories, setCategories);

  return (
    <div className="form-group">
      <label>Categories</label>
      <div className="category-input-group">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="input-field"
          placeholder="Add category"
        />
        <button type="button" onClick={() => { addCategory(newCategory); setNewCategory(""); }} className="btn">
          Add
        </button>
      </div>
      <ul className="category-list">
        {categories.map((cat, i) => (
          <li key={i} className="category-item">
            {cat}
            <button type="button" onClick={() => removeCategory(cat)} className="remove-btn">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
