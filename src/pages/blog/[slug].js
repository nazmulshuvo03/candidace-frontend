import { useRouter } from "next/router";
import BlogDetail from "@/components/Blog/BlogDetail";
import { fetchAllBlogs, fetchSingleBlog } from "@/services/functions/blog";

export default function BlogDetailPage({ blog }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full px-4 py-8">
      <BlogDetail blog={blog} />
    </div>
  );
}

export async function getStaticPaths() {
  const blogs = await fetchAllBlogs();

  const paths = blogs.data.data.map((blog) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    const blog = await fetchSingleBlog(params.slug);

    if (!blog.success) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog: blog.data,
      },
      revalidate: 10, // Revalidate at most every 10 seconds
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      notFound: true,
    };
  }
}
