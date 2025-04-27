import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CategoryManager({ categories, onChange }) {
  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    const name = newName.trim();
    let next = [];
    if (!name) return toast.warning("Enter category name");
    if(categories?.length > 0){
      if (categories?.find((c) => c.name === name)){
        return toast.warning("Category exists");
      }
      next = [...categories, { id: Date.now().toString(), name }];
    }else{
      next.push({ id: Date.now().toString(), name })
    }
    onChange(next);
    toast.success(`Category "${name}" added`);
    setNewName("");
  };

  const handleRemove = (idx) => {
    const removed = categories[idx];
    const next = categories.filter((_, i) => i !== idx);
    onChange(next);
    toast.info(`Category "${removed.name}" removed`);
  };

  return (
    <div className="my-4">
      <label className="form-label">Categories</label>
      <div className="w-100">
        {categories?.map((cat, i) => (
          <div
            key={cat.id}
            className="d-flex justify-content-between align-items-center border p-2 rounded my-1"
          >
            <span>{cat.name}</span>
            <button
              className="btn btn-sm btn-secondary custom-bg-secondary"
              onClick={() => handleRemove(i)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="d-flex mt-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add category"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          className="btn btn-sm btn-secondary custom-bg-secondary"
          onClick={handleAdd}
        >
          Add Category
        </button>
      </div>
    </div>
  );
}

