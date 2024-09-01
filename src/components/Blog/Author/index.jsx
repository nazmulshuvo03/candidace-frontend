import { fetchBlogsOfAuthor } from "@/services/functions/blog";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BlogCard from "../BlogCard";

export default function BlogAuthorDashboard() {
  const author = useSelector((state) => state.user.profile);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await fetchBlogsOfAuthor(author.id);
      setBlogs(data.data.blogs);
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
          className="text-white bg-secondary px-4 py-2 rounded-md shadow-sm"
        >
          Write New Blog
        </Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} authorMode={true} />
          ))
        ) : (
          <p className="text-gray-600">No blogs found.</p>
        )}
      </ul>
    </div>
  );
}
