import BlogList from "@/components/Blog/BlogList";
import CategoryList from "@/components/Blog/CategoryList";
import { fetchAllBlogs, fetchAllCategories } from "@/services/functions/blog";

export default function BlogPage({ blogs, categories }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <BlogList blogs={blogs} />
      </div>
      <div className="lg:col-span-1">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const blogsData = await fetchAllBlogs();
    const categoriesData = await fetchAllCategories();

    if (!blogsData.success || !blogsData.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blogs: blogsData.data,
        categories: categoriesData.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        blogs: [],
        categories: [],
      },
    };
  }
}
