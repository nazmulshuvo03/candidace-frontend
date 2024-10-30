//src/pages/blog/[slug].js
import BlogDetail from "@/components/Blog/BlogDetail"
import { getBlogDetails } from "@/sanity-queries/blog-post"

export default function BlogDetailPage({ blogDetails }) {
  if (!blogDetails) {
    return <div>Post not found</div>
  }

  return (
    <main className="w-full px-4 py-8">
      <BlogDetail blog={blogDetails} />
    </main>
  )
}

export async function getServerSideProps({ params }) {
  try {
    if (!params?.slug) {
      return {
        notFound: true
      }
    }

    const blogDetails = await getBlogDetails(params.slug)

    if (!blogDetails) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        blogDetails
      }
    }
  } catch (error) {
    console.error('Error fetching blog details:', error)
    return {
      notFound: true
    }
  }
}

// import { useRouter } from "next/router";
// import BlogDetail from "@/components/Blog/BlogDetail";
// import { fetchAllBlogs, fetchSingleBlog } from "@/services/functions/blog";
// import Head from "next/head";

// export default function BlogDetailPage({ blog }) {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Head>
//         <title>{blog.title}</title>
//         <meta name="robots" content="index, follow" />
//         <meta name="description" content={blog.excerpt} />
//         <meta name="author" content={blog?.profile?.userName} />
//       </Head>
//       <main className="w-full px-4 py-8">
//         <BlogDetail blog={blog} />
//       </main>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const blogs = await fetchAllBlogs();

//   const paths = blogs.data.data.map((blog) => ({
//     params: { slug: blog.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }) {
//   try {
//     const blog = await fetchSingleBlog(params.slug);

//     if (!blog.success) {
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: {
//         blog: blog.data,
//       },
//       revalidate: 10, // Revalidate at most every 10 seconds
//     };
//   } catch (error) {
//     console.error("Error fetching blog:", error);
//     return {
//       notFound: true,
//     };
//   }
// }
