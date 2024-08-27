import Link from "next/link";

export default function BlogDetail({ blog }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="mb-6 w-full h-auto"
        />
      )}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <div className="text-sm text-gray-500 mt-4">
        <Link href={`/blog/author/${blog.authorId}`}>
          {blog.profile?.userName || "Unknown Author"}
        </Link>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
