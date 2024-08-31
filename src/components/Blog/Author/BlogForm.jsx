import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CategorySelector from "./CategorySelector";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

export default function BlogForm({
  initialData = {},
  onSubmit,
  submitButtonText,
}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [excerpt, setExcerpt] = useState(initialData.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(
    initialData.featuredImage || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    initialData.categoryId || ""
  );
  const [tags, setTags] = useState(initialData.tags || "");
  const [status, setStatus] = useState(initialData.status || "draft");
  const [seoMetaDescription, setSeoMetaDescription] = useState(
    initialData.seoMetaDescription || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      excerpt,
      featuredImage,
      categoryId: selectedCategory,
      tags: tags.split(",").map((tag) => tag.trim()),
      status,
      seoMetaDescription,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ height: "85vh" }}
      className="overflow-y-auto"
    >
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
        {submitButtonText}
      </button>
    </form>
  );
}
