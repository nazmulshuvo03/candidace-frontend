// components/CategorySelector.js

import { useState, useEffect } from "react";

export default function CategorySelector({
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  useEffect(() => {
    // Fetch categories from the API
    async function fetchCategories() {
      try {
        const res = await fetch("http://localhost:4040/api/v1/blog/categories");
        const data = await res.json();
        setCategories(data.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleAddNewCategory = async () => {
    try {
      const res = await fetch("http://localhost:4040/api/v1/blog/categories", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategory }),
      });
      const data = await res.json();

      if (data.success) {
        setCategories((prev) => {
          return [...prev, data.data];
        });
        setSelectedCategory(data.data.id);
        setNewCategory("");
        setShowNewCategoryInput(false);
      } else {
        console.error("Failed to create category", data.message);
      }
    } catch (error) {
      console.error("Error creating category:", error);
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
