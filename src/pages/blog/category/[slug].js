import { fetchBlogsOfCategory } from "@/services/functions/blog";
import Link from "next/link";

export default function CategoryBlogsPage({ all, category, blogs }) {
  if (!category) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Category Not Found</h1>
        <p>The category you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Blogs in "{category.name}"</h1>
      <p className="mb-6">Creator: {category?.creator?.userName}</p>
      <ul className="space-y-8">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <li key={blog.id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
              </h3>
              <p className="text-gray-700 mb-4">{blog.excerpt}</p>
              <div className="text-sm text-gray-500">
                <span>By {blog.profile?.userName || "Unknown Author"}</span> |{" "}
                <span>
                  Published on {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p>No blogs found in this category.</p>
        )}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const data = await fetchBlogsOfCategory(slug);

    if (!data.success || !data.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        all: await fetchBlogsOfCategory(slug),
        category: data.data.category || null,
        blogs: data.data.blogs || [],
      },
    };
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    return {
      props: {
        category: null,
        blogs: [],
      },
    };
  }
}
