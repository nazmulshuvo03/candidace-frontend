// pages/dashboard/author/edit/[slug].js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

export default function EditBlogPage({ slug }) {
  const router = useRouter();
  const author = useSelector((state) => state.user.profile);

  const [blogId, setBlogId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [seoMetaDescription, setSeoMetaDescription] = useState("");
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch blog data by slug and categories
    async function fetchBlogData() {
      try {
        const [blogRes, categoriesRes] = await Promise.all([
          fetch(`http://localhost:4040/api/v1/blog/slug/${slug}`),
          fetch("http://localhost:4040/api/v1/blog/categories"),
        ]);

        const blogData = await blogRes.json();
        const categoriesData = await categoriesRes.json();

        if (blogRes.ok && categoriesRes.ok) {
          const blog = blogData.data;
          setBlogId(blog.id);
          setTitle(blog.title);
          setContent(blog.content);
          setExcerpt(blog.excerpt || "");
          setFeaturedImage(blog.featuredImage || "");
          setCategoryId(blog.categoryId || "");
          setTags(blog.tags ? blog.tags.join(", ") : "");
          setStatus(blog.status || "draft");
          setSeoMetaDescription(blog.seoMetaDescription || "");
          setCommentsEnabled(blog.commentsEnabled !== false);
          setCategories(categoriesData.data);
        } else {
          console.error("Failed to load blog data or categories.");
          router.push("/dashboard/author");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        router.push("/dashboard/author");
      }
    }

    if (slug) {
      fetchBlogData();
    }
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4040/api/v1/blog/${blogId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            excerpt,
            featuredImage,
            categoryId,
            tags: tags.split(",").map((tag) => tag.trim()),
            status,
            seoMetaDescription,
            commentsEnabled,
          }),
        }
      );

      if (response.ok) {
        router.push("/dashboard/author");
      } else {
        console.error("Failed to update blog.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Excerpt
              </label>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Featured Image URL
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Content
              </label>
              <RichTextEditor value={content} onChange={setContent} />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a category</option>
                {categories &&
                  categories.data &&
                  categories.data.length &&
                  categories.data.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                SEO Meta Description
              </label>
              <textarea
                value={seoMetaDescription}
                onChange={(e) => setSeoMetaDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Comments Enabled
              </label>
              <input
                type="checkbox"
                checked={commentsEnabled}
                onChange={(e) => setCommentsEnabled(e.target.checked)}
                className="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
