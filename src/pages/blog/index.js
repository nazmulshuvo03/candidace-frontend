import BlogList from "@/components/Blog/BlogList";
import CategoryList from "@/components/Blog/CategoryList";

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
    const blogRes = await fetch(`http://localhost:4040/api/v1/blog`);
    const categoryRes = await fetch(
      `http://localhost:4040/api/v1/blog/categories`
    );

    const blogsData = await blogRes.json();
    const categoriesData = await categoryRes.json();

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
