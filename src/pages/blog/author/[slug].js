import BlogList from "@/components/Blog/BlogList";
import Breadcrumb from "@/components/Blog/Breadcrumb";
import { getBlogPostsByAuthor } from "@/sanity-queries/blog-post";

export default function AuthorBlogsPage({ author, posts }) {

    const items = [
        { label: 'Home', url: '/' },
        { label: 'Blog', url: '/blog' },
        { 
            label: author.username || author.name, 
            url: `/blog/author/${author.slug}` 
        },
    ];

    if (!author) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">Author Not Found</h1>
                <p>The author you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="px-4 w-full">
            <div className="w-full max-w-[90rem] mx-auto mt-8">
                <Breadcrumb items={items} />
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                        <span>Blogs by</span>{" "}
                        <span className="text-secondary">
                            {author.username ? `${author.name}` : author.name}
                        </span>
                    </h1>
                </div>
                <div>
                    {posts.length > 0 ? (
                        <BlogList blogs={posts} gridCols="four" />
                    ) : (
                        <p className="mt-8 text-gray-500">
                            No blog posts found for this author.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    try {
        const { author, posts } = await getBlogPostsByAuthor(params.slug);

        // If no author found, return 404
        if (!author) {
            return {
                notFound: true
            };
        }

        return {
            props: {
                author,
                posts
            }
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        console.error('Error stack:', error.stack);
        return {
            notFound: true
        };
    }
}


// import BlogCard from "@/components/Blog/BlogCard";
// import { fetchBlogsOfAuthor } from "@/services/functions/blog";

// export default function AuthorBlogsPage({ author, blogs }) {
//   if (!author) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold">Author Not Found</h1>
//         <p>The author you are looking for does not exist.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="text-3xl font-bold pt-2 pb-2">
//         <span className="text-gray-500">Blogs by</span>{" "}
//         <span className="text-secondary">@{author.userName}</span>
//       </div>
//       <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
//         {blogs.length > 0 ? (
//           blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
//         ) : (
//           <p>No blogs found for this author.</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export async function getServerSideProps(context) {
//   const { authorId } = context.params;

//   try {
//     const data = await fetchBlogsOfAuthor(authorId);

//     if (!data.success || !data.data) {
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: {
//         author: data.data.author || null,
//         blogs: data.data.blogs || [],
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching blogs by author:", error);
//     return {
//       props: {
//         author: null,
//         blogs: [],
//       },
//     };
//   }
// }
