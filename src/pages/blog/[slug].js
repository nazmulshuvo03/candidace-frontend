import { useRouter } from "next/router";
import BlogDetail from "@/components/Blog/BlogDetail";

export default function BlogDetailPage({ blog }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BlogDetail blog={blog} />
    </div>
  );
}

export async function getStaticPaths() {
  // Fetch all blogs to generate paths for static generation
  const res = await fetch("http://localhost:4040/api/v1/blog");
  const blogs = await res.json();

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
    // Fetch blog by slug
    const res = await fetch(
      `http://localhost:4040/api/v1/blog/slug/${params.slug}`
    );
    const blog = await res.json();

    if (!blog.data) {
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
