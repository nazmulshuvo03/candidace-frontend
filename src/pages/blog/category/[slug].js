import BlogCard from "@/components/Blog/BlogCard";
import { fetchBlogsOfCategory } from "@/services/functions/blog";
import moment from "moment";
import Link from "next/link";

export default function CategoryBlogsPage({ category, blogs }) {
  if (!category) {
    return (
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold">Category Not Found</h1>
        <p>The category you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-6">
        <div className="text-3xl font-bold pt-2 pb-2">
          <span className="text-gray-500">Blogs in</span>{" "}
          <span className="text-secondary">{category.name}</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href={`/blog/author/${category?.creator?.id}`}
            className="flex gap-2 items-center py-1"
          >
            <img
              src={category?.creator?.photoURL}
              alt={category?.creator?.userName}
              className="h-6 w-6 rounded-full"
            />
            <div className="text-md font-semibold">
              @{category?.creator?.userName}
            </div>
          </Link>
          <div className="text-md text-gray-500">
            {moment(category.createdAt).format("MMM DD, YYYY")}
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
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
