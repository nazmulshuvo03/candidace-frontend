import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

const CategoryList = ({ categories, currentCategorySlug }) => {
  const [expandedCategories, setExpandedCategories] = React.useState({});
  // When the component mounts, expand the parent categories of the current category
  React.useEffect(() => {
    if (currentCategorySlug && categories) {
      const currentCategory = categories.find(cat => cat.slug === currentCategorySlug);
      if (currentCategory?.parentCategory) {
        setExpandedCategories(prev => ({
          ...prev,
          [currentCategory.parentCategory._id]: true
        }));
      }
    }
  }, [currentCategorySlug, categories]);

  // Filter to get only top-level categories (those without parent)
  const topLevelCategories = categories?.filter(cat => !cat.parentCategory);

  // Group subcategories by parent ID for easier access
  const subcategoriesByParent = categories?.reduce((acc, cat) => {
    if (cat.parentCategory) {
      if (!acc[cat.parentCategory._id]) {
        acc[cat.parentCategory._id] = [];
      }
      acc[cat.parentCategory._id].push(cat);
    }
    return acc;
  }, {});

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const CategoryItem = ({ category, level = 0 }) => {
    const hasSubcategories = subcategoriesByParent[category._id]?.length > 0;
    const isExpanded = expandedCategories[category._id];
    const isActive = category.slug === currentCategorySlug;

    return (
      <div className="w-full">
        <div
          className={`flex items-center justify-between py-2 px-${level * 4} hover:bg-gray-50 cursor-pointer rounded-md px-2 transition-all
            ${hasSubcategories ? 'pl-1' : 'pl-4'}
            ${isActive ? 'bg-[#00678c18] hover:bg-[#00678c3a]' : ''}`}
        >
          <div className="flex items-center gap-2">
            {hasSubcategories && (
              <button
                onClick={() => toggleCategory(category._id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {isExpanded ? (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-[#00668C] size-3 sm:text-base"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-[#00668C] size-3 sm:text-base"
                  />
                )}
              </button>
            )}
            <Link
              href={`/blog/category/${category.slug}`}
              className={`flex-1 hover:text-[#00668C] transition-all text-sm sm:text-base ${isActive ? 'text-[#00668C] font-medium' : ''}`}
            >
              {category.title}
              <span className="text-sm text-gray-500 ml-2">
                ({category.postCount})
              </span>
            </Link>
          </div>
        </div>

        {hasSubcategories && isExpanded && (
          <div className="ml-4">
            {subcategoriesByParent[category._id].map(subcategory => (
              <CategoryItem
                key={subcategory._id}
                category={subcategory}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="space-y-1">
        {topLevelCategories?.map(category => (
          <CategoryItem key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
