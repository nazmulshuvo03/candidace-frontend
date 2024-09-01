import moment from "moment";
import Link from "next/link";

export default function BlogDetail({ blog }) {
  return (
    <div className="px-4 py-8">
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
        <Link
          href={`/blog/author/${blog.authorId}`}
          className="flex gap-2 items-center"
        >
          <img
            src={blog.profile?.photoURL}
            alt={blog.profile.userName}
            className="h-4 w-4 rounded-full"
          />
          @{blog.profile?.userName || "Unknown Author"}
        </Link>
        <div>{moment(blog.createdAt).format("MMM DD, YYYY")}</div>
      </div>
    </div>
  );
}
