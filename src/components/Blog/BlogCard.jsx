import Link from "next/link";
import { Tooltip } from "../Tooltip";
import moment from "moment";

export default function BlogCard({ blog }) {
  return (
    <li className="bg-white shadow-md rounded-lg">
      <Link href={`/blog/${blog.slug}`}>
        <img
          src={blog.featuredImage}
          alt="Featured Image"
          className="w-full h-52 rounded-t-lg"
        />
      </Link>
      <div className="px-4 pt-2 pb-4">
        <Link href={`/blog/${blog.slug}`}>
          <Tooltip text={blog.title} className={"!whitespace-normal"}>
            <div className="text-xl font-semibold mb-2 line-clamp-2 h-14">
              {blog.title}
            </div>
          </Tooltip>
        </Link>
        <Link
          href={`/blog/category/${blog?.category?.slug}`}
          className="pb-2 text-sm font-bold text-gray-500 cursor-pointer"
        >
          {blog?.category?.name}
        </Link>
        <div className="flex justify-between text-sm text-gray-400">
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
    </li>
  );
}
