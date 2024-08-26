// components/Blog/BlogList.js

import Link from "next/link";

export default function BlogList({ blogs }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">All Blogs</h2>
      <ul className="space-y-8">
        {blogs &&
          blogs.data &&
          blogs.data.length > 0 &&
          blogs.data.map((blog) => (
            <li key={blog.id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">
                <Link href={`/blog/${blog.slug}`}>
                  <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    {blog.title}
                  </span>
                </Link>
              </h3>
              <p className="text-gray-700 mb-4">{blog.excerpt}</p>
              <div className="text-sm text-gray-500">
                <Link href={`/blog/author/${blog.authorId}`}>
                  {blog.profile?.userName || "Unknown Author"}
                </Link>{" "}
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
