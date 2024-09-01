import Link from "next/link";

export default function CategoryList({ categories }) {
  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">{`Categories (${categories?.meta?.total})`}</h2>
      <ul className="flex flex-wrap gap-2">
        {categories &&
          categories.data &&
          categories.data.length > 0 &&
          categories.data.map((category) => (
            <li
              key={category.id}
              className="border-2 px-4 py-1 rounded border-secondary hover:bg-secondary"
            >
              <Link
                href={`/blog/category/${category.slug}`}
                className="text-secondary hover:text-slate-50 cursor-pointer"
              >
                {category.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
