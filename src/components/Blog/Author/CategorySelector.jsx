// components/CategorySelector.js

import { createCategory, fetchAllCategories } from "@/services/functions/blog";
import { useState, useEffect } from "react";

export default function CategorySelector({
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await fetchAllCategories();
        setCategories(data.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleAddNewCategory = async () => {
    const data = await createCategory({ name: newCategory });

    if (data && data.success) {
      setCategories((prev) => {
        return [...prev, data.data];
      });
      setSelectedCategory(data.data.id);
      setNewCategory("");
      setShowNewCategoryInput(false);
    } else {
      console.error("Failed to create category", data.message);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Category
      </label>
      <div className="flex items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a category</option>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        <button
          type="button"
          onClick={() => setShowNewCategoryInput(true)}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Add New Category
        </button>
      </div>
      {showNewCategoryInput && (
        <div className="mt-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={handleAddNewCategory}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
