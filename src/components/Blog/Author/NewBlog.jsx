import { useRouter } from "next/router";
import BlogForm from "./BlogForm";
import { createBlog } from "@/services/functions/blog";

export default function NewBlogPage() {
  const router = useRouter();

  const handleSubmit = async (blogData) => {
    const data = await createBlog(blogData);

    if (data && data.success) {
      router.push("/dashboard/author");
    } else {
      console.error("Failed to create blog");
    }
  };

  return (
    <div className="h-full px-4 py-4">
      <BlogForm onSubmit={handleSubmit} submitButtonText="Publish Blog" />
    </div>
  );
}
