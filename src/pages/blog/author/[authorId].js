import BlogCard from "@/components/Blog/BlogCard";
import { fetchBlogsOfAuthor } from "@/services/functions/blog";

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
      <div className="text-3xl font-bold pt-2 pb-2">
        <span className="text-gray-500">Blogs by</span>{" "}
        <span className="text-secondary">@{author.userName}</span>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
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
