//src/pages/blog/category/[slug].js
import BlogHeader from "@/components/Blog/BlogHeader";
import BlogList from "@/components/Blog/BlogList"
import Breadcrumb from "@/components/Blog/Breadcrumb";
import CategoryList from "@/components/Blog/CategoryList"
import { getBlogPostsByCategory, getAllCategories, getCategoryBySlug } from "@/sanity-queries/blog-post"

export default function CategoryPage({ blogPosts, categories, currentCategory }) {
  const items = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
    { label: `${currentCategory.title}`, url: `/blog/category/${currentCategory.slug}` },
  ];
  return (
    <div className="px-4 w-full">
      <div className="w-full max-w-[90rem] mx-auto mt-8">
        <Breadcrumb items={items}/>
        <BlogHeader
          title={currentCategory.title}
          description={currentCategory.description || `Explore our ${currentCategory.title} articles and insights`}
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogList blogs={blogPosts} />
          </div>
          <div className="lg:col-span-1 py-8">
            <CategoryList categories={categories} currentCategorySlug={currentCategory.slug} />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const [blogPosts, categories, currentCategory] = await Promise.all([
      getBlogPostsByCategory(params.slug),
      getAllCategories(),
      getCategoryBySlug(params.slug)
    ]);

    if (!currentCategory) {
      return {
        notFound: true // This will show the 404 page
      }
    }

    return {
      props: {
        blogPosts,
        categories,
        currentCategory
      }
    }
  } catch (error) {
    console.error('Error loading category page:', error);
    return {
      notFound: true
    }
  }
}