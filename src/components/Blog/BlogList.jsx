import BlogCard from "./BlogCard";

export default function BlogList({ blogs }) {
  return (
    <div className="px-4 py-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {blogs &&
          blogs.data &&
          blogs.data.length > 0 &&
          blogs.data.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </ul>
    </div>
  );
}
