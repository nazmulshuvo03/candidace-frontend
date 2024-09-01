import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BlogForm from "./BlogForm";
import { fetchSingleBlog, updateBlog } from "@/services/functions/blog";

export default function EditBlogPage({ slug }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    async function fetchBlogData() {
      const blogData = await fetchSingleBlog(slug);

      if (blogData.success) {
        const blog = blogData.data;
        setInitialData({
          id: blog.id,
          title: blog.title,
          content: blog.content,
          excerpt: blog.excerpt || "",
          featuredImage: blog.featuredImage || "",
          categoryId: blog.categoryId || "",
          tags: blog.tags ? blog.tags.join(", ") : "",
          status: blog.status || "draft",
        });
      } else {
        console.error("Failed to load blog data.");
        router.push("/dashboard/author");
      }
    }

    if (slug) {
      fetchBlogData();
    }
  }, [slug]);

  const handleSubmit = async (blogData) => {
    const data = await updateBlog(initialData.id, blogData);

    if (data && data.success) {
      router.push("/dashboard/author");
    } else {
      console.error("Failed to update blog.");
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full px-4 py-4">
      <BlogForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitButtonText="Update Blog"
      />
    </div>
  );
}
