import { useState } from "react";
import useCategories from "../hooks/useCategories";

const CategoryManager = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState("");
  const { addCategory, removeCategory } = useCategories(categories, setCategories);

  return (
    <div className="w-100 my-4">
      <label>Categories</label>
      <div className="category-input-group">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="form-control my-2"
          placeholder="Add category"
        />
        <button type="button" onClick={() => { addCategory(newCategory); setNewCategory(""); }} className="btn btn-sm btn-primary custom-bg-primary">
          Add
        </button>
      </div>
      <div className="w-100">
        {categories.map((cat, i) => (
          <div className="d-flex flex-row justify-content-between w-100 align-items-center border p-1 rounded my-1" key={i}>
            <span>{cat}</span>
            <button type="button" onClick={() => removeCategory(cat)} className="btn btn-sm btn-secondary custom-bg-secondary">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
