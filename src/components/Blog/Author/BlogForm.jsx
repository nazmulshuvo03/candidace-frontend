import { useState } from "react";
import dynamic from "next/dynamic";
import CategorySelector from "./CategorySelector";
import { uploadFile } from "@/store/middlewares/file";
import { useDispatch } from "react-redux";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

export default function BlogForm({
  initialData = {},
  onSubmit = () => {},
  heading = "",
  submitButtonText = "",
}) {
  const dispatch = useDispatch();
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
  const [newImage, setNewImage] = useState(null);

  const handleImageSubmit = async () => {
    const formData = new FormData();
    formData.append("file", newImage);
    const imageData = await dispatch(uploadFile(formData));
    setFeaturedImage(imageData.Location);
    setNewImage(null);
  };

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
      className="overflow-y-auto grid grid-cols-1 lg:grid-cols-4 gap-8"
    >
      {/* Rich Text Editor - 3/4th of the screen */}
      <div className="lg:col-span-3 flex flex-col">
        <label className="block text-gray-600 text-lg font-bold mb-2">
          {heading}
        </label>
        <div className="flex-grow">
          <RichTextEditor value={content} onChange={setContent} />
        </div>
      </div>

      {/* Other form fields - 1/4th of the screen */}
      <div className="lg:col-span-1">
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

        {/* Featured Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Featured Image
          </label>
          <label className="relative inline-block cursor-pointer">
            <img
              src={newImage ? URL.createObjectURL(newImage) : featuredImage}
              alt="Featured"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-0 opacity-0 hover:opacity-100 hover:bg-opacity-50 transition duration-300 ease-in-out">
              <span className="text-white text-sm">Change Image</span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
          </label>
          {newImage && (
            <div className="flex items-center gap-4 mt-2">
              <button
                type="button"
                onClick={handleImageSubmit}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setNewImage(null)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}
