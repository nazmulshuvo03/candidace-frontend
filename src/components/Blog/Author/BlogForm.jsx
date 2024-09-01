import { useState } from "react";
import dynamic from "next/dynamic";
import CategorySelector from "./CategorySelector";
import { uploadFile } from "@/store/middlewares/file";
import { useDispatch } from "react-redux";
import { Input } from "@/components/Input";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";
import FeatureImageSelector from "./FeatureImageSelector";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

export default function BlogForm({
  initialData = {},
  onSubmit = () => {},
  submitButtonText = "",
}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [excerpt, setExcerpt] = useState(initialData.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(
    initialData.featuredImage ||
      "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default_blog.jpeg"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    initialData.categoryId || ""
  );
  const [tags, setTags] = useState(initialData.tags || "");
  const [status, setStatus] = useState(initialData.status || "draft");
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
    });
  };

  return (
    <form
      style={{ height: "90vh" }}
      className="grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-hidden"
      onSubmit={handleSubmit}
    >
      {/* Rich Text Editor - 3/4th of the screen */}
      <div className="lg:col-span-3">
        <div className="mb-2">
          <Input
            label={"Title"}
            type="text"
            placeholder="Blog Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      {/* Other form fields - 1/4th of the screen */}
      <div className="lg:col-span-1 h-full pb-5 overflow-y-auto">
        <Button type="submit" className="w-full mb-4">
          {submitButtonText}
        </Button>

        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Dropdown
          label="Status"
          name="status"
          options={[
            { id: "draft", name: "Draft" },
            { id: "published", name: "Published" },
            { id: "pending", name: "Pending" },
          ]}
          value={status || ""}
          onSelect={(e) => setStatus(e.target.value)}
          allowSearch={false}
          className="mb-4"
        />

        <div className="mb-4">
          <Input
            label={"Excerpt"}
            type="textArea"
            placeholder="Summary of the blog..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>

        <FeatureImageSelector
          featuredImage={featuredImage}
          newImage={newImage}
          setNewImage={setNewImage}
          handleImageSubmit={handleImageSubmit}
        />

        <div className="mb-4">
          <label className="text-xs">Tags (comma separated)</label>
          <Input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
