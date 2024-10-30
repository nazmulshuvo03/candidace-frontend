import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { dateFormat } from "@/utils/blog";

export default function BlogList({ blogs, gridCols = "default" }) {
  const gridClassName = gridCols === "four" 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5";

  return (
    <div className="pt-8 pb-14">
      <div className={gridClassName}>
        {blogs.length > 0 ? blogs.map((blog) => (
          <div
            key={blog._id}
            className="group relative border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-200"
          >
            <Link href={`/blog/${blog.slug}`} className="cursor-pointer p-4 inline-block">
              <div>
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt='project'
                  width={400}
                  height={400}
                  quality={100}
                  priority={true}
                  className='w-full h-[200px] object-cover rounded-lg'
                />
              </div>
              <div className="mt-4 flex flex-col justify-between gap-5">
                <div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-3">
                    {blog.smallDescription}
                  </p>
                </div>
              </div>
            </Link>
            <div className="p-4 pt-0">
              <Link
                href={`/blog/category/${blog.category[0].slug}`}
                className="pb-2 text-sm font-bold text-gray-600 hover:text-gray-800"
                onClick={(e) => e.stopPropagation()}
              >
                {blog.category[0].title}
              </Link>
              <div className="flex justify-between items-center flex-wrap text-xs sm:text-sm text-gray-400 mt-2 gap-3">
                <Link
                  href={`/blog/author/${blog.author.slug}`}
                  className="flex gap-2 items-center hover:text-gray-600"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={urlFor(blog.author.avatar).url()}
                    alt={blog.author.username}
                    className="size-5 rounded-full"
                  />
                  <span>{blog.author.username || "Unknown Author"}</span>
                </Link>
                <p className="text-xs font-normal sm:font-medium text-gray-400">
                  {dateFormat(blog.publishedAt)}
                </p>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center text-gray-500">
            No blogs found
          </div>
        )}
      </div>
    </div>
  );
}

// //src/components/Blog/BlogList.jsx
// import { urlFor } from "@/lib/sanity";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { dateFormat } from "@/utils/blog";

// export default function BlogList({ blogs }) {
//   const router = useRouter();

//   return (
//     <div className="pt-8 pb-14">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {blogs.length > 0 ? blogs.map((blog) => (
//           <div
//             key={blog._id}
//             className="group relative border border-gray-200 bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-xl transition-shadow duration-200"
//             onClick={() => router.push(`/blog/${blog.slug}`)}
//           >
//             <div>
//               <Image
//                 src={urlFor(blog.mainImage).url()}
//                 alt='project'
//                 width={400}
//                 height={400}
//                 quality={100}
//                 priority={true}
//                 className='w-full h-[200px] object-cover rounded-lg'
//               />
//             </div>
//             <div className="mt-4 flex flex-col justify-between gap-5">
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 line-clamp-2">
//                   {blog.title}
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-500 line-clamp-3">
//                   {blog.smallDescription}
//                 </p>
//               </div>
//               <div>
//                 <Link
//                   href={`/blog/category/${blog.category[0].slug}`}
//                   className="pb-2 text-sm font-bold text-gray-600 cursor-pointer"
//                 >
//                   {blog.category[0].title}
//                 </Link>
//                 <div className="flex justify-between items-center flex-wrap text-xs sm:text-sm text-gray-400 mt-2 gap-3">
//                   <Link
//                     href={`/blog/author/${blog.author.slug}`}
//                     className="flex gap-2 items-center"
//                   >
//                     <img
//                       src={urlFor(blog.author.avatar).url()}
//                       alt={blog.author.username}
//                       className="size-5 rounded-full"
//                     />
//                     <span>{blog.author.username || "Unknown Author"}</span>
//                   </Link>
//                   <p className="text-xs font-normal sm:font-medium text-gray-400">
//                     {dateFormat(blog.publishedAt)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )) : (
//           <div className="col-span-full text-center text-gray-500">
//             No blogs found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
