// pages/dashboard/blog/index.js

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function BlogAuthorDashboard() {
  const author = useSelector((state) => state.user.profile);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(
          `http://localhost:4040/api/v1/blog/author/${author.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setBlogs(data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    if (author?.id) {
      fetchBlogs();
    }
  }, [author]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Blogs</h1>
        <Link
          href="/dashboard/author/new"
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md shadow-sm"
        >
          Write New Blog
        </Link>
      </div>
      <ul className="space-y-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <li key={blog.id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                <Link
                  href={`/dashboard/author/edit/${blog.slug}`}
                  className="hover:text-blue-500"
                >
                  {blog.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="text-sm text-gray-500">
                <span>
                  Published on {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-600">No blogs found.</p>
        )}
      </ul>
    </div>
  );
}
