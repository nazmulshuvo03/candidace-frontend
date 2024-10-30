//src/pages/blog/index.js:
import BlogHeader from "@/components/Blog/BlogHeader"
import BlogList from "@/components/Blog/BlogList"
import Breadcrumb from "@/components/Blog/Breadcrumb"
import CategoryList from "@/components/Blog/CategoryList"
import { getAllBlogPosts, getAllCategories } from "@/sanity-queries/blog-post"

const items = [
  { label: 'Home', url: '/' },
  { label: 'Blog', url: `/blog` },
];

export default function BlogPage({ blogPosts, categories }) {
  return (
    <div className="px-4 w-full">
      <div className="w-full max-w-[90rem] mx-auto mt-8">
        <Breadcrumb items={items}/>
        <BlogHeader
          title="Our Blog"
          description="Explore our latest insights, stories, and updates"
        />
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 sm:gap-7">
          <div className="lg:col-span-3 order-2 sm:order-1">
            <BlogList blogs={blogPosts} />
          </div>
          <div className="lg:col-span-1 pt-5 sm:py-8 order-1 sm:order-2">
            <CategoryList categories={categories} />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const [blogPosts, categories] = await Promise.all([
    getAllBlogPosts(),
    getAllCategories()
  ]);

  return { props: { blogPosts, categories } }
}