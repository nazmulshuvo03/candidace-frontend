import { Dropdown } from "@/components/Dropdown";
import { createCategory, fetchAllCategories } from "@/services/functions/blog";
import { useState, useEffect } from "react";

export default function CategorySelector({
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState([]);

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

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddNewCategory = async (data) => {
    const res = await createCategory(data);
    setCategories((prev) => [...prev, { ...res.data }]);
    return res?.data;
  };

  return (
    <div className="w-full mb-4">
      <Dropdown
        name={"category"}
        value={selectedCategory || ""}
        options={categories}
        onSelect={handleChange}
        label="Blog Categories *"
        allowSearch={true}
        allowAddNew={true}
        addNewAction={handleAddNewCategory}
      />
    </div>
  );
}
