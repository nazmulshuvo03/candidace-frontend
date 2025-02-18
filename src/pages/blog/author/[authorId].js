import { fetchBlogsOfAuthor } from "@/services/functions/blog";
import Link from "next/link";

export default function AuthorBlogsPage({ author, blogs }) {
  if (!author) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Author Not Found</h1>
        <p>The author you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blogs by {author.userName}</h1>
      <ul className="space-y-8 mt-6">
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
          <p>No blogs found for this author.</p>
        )}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { authorId } = context.params;

  try {
    const data = await fetchBlogsOfAuthor(authorId);

    if (!data.success || !data.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        author: data.data.author || null,
        blogs: data.data.blogs || [],
      },
    };
  } catch (error) {
    console.error("Error fetching blogs by author:", error);
    return {
      props: {
        author: null,
        blogs: [],
      },
    };
  }
}
