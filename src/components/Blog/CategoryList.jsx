// components/Blog/CategoryList.js

import Link from "next/link";

export default function CategoryList({ categories }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Categories</h2>
      <ul className="flex space-x-4">
        {categories &&
          categories.data &&
          categories.data.length > 0 &&
          categories.data.map((category) => (
            <li key={category.id}>
              <Link href={`#`}>
                <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
