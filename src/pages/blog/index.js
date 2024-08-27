import BlogList from "@/components/Blog/BlogList";
import CategoryList from "@/components/Blog/CategoryList";
import { fetchAllBlogs, fetchAllCategories } from "@/services/functions/blog";

export default function BlogPage({ blogs, categories }) {
  return (
    <div>
      <CategoryList categories={categories} />
      <BlogList blogs={blogs} />
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
