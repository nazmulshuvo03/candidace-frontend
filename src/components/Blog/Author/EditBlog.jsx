import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import CategorySelector from "./CategorySelector";
import {
  fetchAllCategories,
  fetchSingleBlog,
  updateBlog,
} from "@/services/functions/blog";

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [seoMetaDescription, setSeoMetaDescription] = useState("");

  useEffect(() => {
    async function fetchBlogData() {
      const blogData = await fetchSingleBlog(slug);
      const categoriesData = await fetchAllCategories();

      if (blogData.success && categoriesData.success) {
        const blog = blogData.data;
        setBlogId(blog.id);
        setTitle(blog.title);
        setContent(blog.content);
        setExcerpt(blog.excerpt || "");
        setFeaturedImage(blog.featuredImage || "");
        setSelectedCategory(blog.categoryId || "");
        setTags(blog.tags ? blog.tags.join(", ") : "");
        setStatus(blog.status || "draft");
        setSeoMetaDescription(blog.seoMetaDescription || "");
      } else {
        console.error("Failed to load blog data or categories.");
        router.push("/dashboard/author");
      }
    }

    if (slug) {
      fetchBlogData();
    }
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await updateBlog(blogId, {
      title,
      content,
      excerpt,
      featuredImage,
      categoryId: selectedCategory,
      tags: tags.split(",").map((tag) => tag.trim()),
      status,
      seoMetaDescription,
    });

    if (data && data.success) {
      router.push("/dashboard/author");
    } else {
      console.error("Failed to update blog.");
    }
  };

  return (
    <div className="h-full max-w-6xl mx-auto px-4 py-8 overflow-y-auto">
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
            <CategorySelector
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
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
