import { toast } from "react-toastify";

const useCategories = (categories, setCategories) => {
  const addCategory = (newCategory) => {
    if (!newCategory) return;
    if (categories.includes(newCategory)) {
      toast.warning("Category already exists");
      return;
    }
    setCategories([...categories, newCategory]);
    toast.success(`Category "${newCategory}" added`);
  };

  const removeCategory = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
    toast.info(`Category "${cat}" removed`);
  };

  return { addCategory, removeCategory };
};

export default useCategories;
