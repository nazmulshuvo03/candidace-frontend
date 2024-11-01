//src/pages/blog/index.js
import Head from 'next/head';
import BlogHeader from "@/components/Blog/BlogHeader";
import BlogList from "@/components/Blog/BlogList";
import Breadcrumb from "@/components/Blog/Breadcrumb";
import CategoryList from "@/components/Blog/CategoryList";
import { urlFor } from "@/lib/sanity";
import { getAllBlogPosts, getAllCategories } from "@/sanity-queries/blog-post";
import BlogLayout from '@/components/Blog/BlogLayout';

// Utility function to generate structured data
function generateBlogListStructuredData(blogPosts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Candidace Tech Blog',
    'description': 'Cutting-edge technology insights and development trends',
    'blogPost': blogPosts.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'image': post.mainImage ? urlFor(post.mainImage).url() : '',
      'datePublished': post.publishedAt,
      'dateModified': post._updatedAt || post.publishedAt,
      'author': {
        '@type': 'Person',
        'name': post.author?.name || 'Candidace Team'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Candidace',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://candidace.fyi/logo.png'
        }
      }
    }))
  };
}

// Metadata generation function
function generateMetadata(blogPosts) {
  // Extract and deduplicate tags from all posts
  const allTags = [...new Set(
    blogPosts.flatMap(post => post.tags || [])
  )].slice(0, 10); // Limit to top 10 tags

  return {
    title: 'Our Blogs | Candidace',
    description: `Explore our curated collection of ${blogPosts.length} in-depth tech articles, covering the latest technology trends, development insights, and expert analysis across multiple categories.`,
    keywords: [
      ...allTags,
      'technology blog',
      'software development',
      'tech insights',
      'programming trends',
      'industry expertise'
    ],
    canonical: 'https://candidace.fyi/blog',
    ogImage: blogPosts[0]?.mainImage
      ? urlFor(blogPosts[0].mainImage).width(1200).height(630).url()
      : 'https://candidace.fyi/default-og-image.jpg',
    robots: 'index, follow',
    author: 'Candidace Team',
    alternateLanguages: [
      { href: 'https://candidace.fyi/blog', hrefLang: 'en' }
    ]
  };
}

export async function getServerSideProps() {
  try {
    const [blogPosts, categories] = await Promise.all([
      getAllBlogPosts(),
      getAllCategories(),
    ]);

    const metadata = generateMetadata(blogPosts);

    return {
      props: {
        blogPosts,
        categories,
        metadata,
        structuredData: generateBlogListStructuredData(blogPosts)
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);

    // Fallback metadata
    const defaultMetadata = {
      title: 'Our Blogs | Candidace',
      description: 'Explore our collection of technology and development articles.',
      keywords: [],
      ogImage: 'https://candidace.fyi/default-og-image.jpg',
      canonical: 'https://candidace.fyi/blog',
      robots: 'index, follow'
    };

    return {
      props: {
        blogPosts: [],
        categories: [],
        metadata: defaultMetadata,
        structuredData: null
      }
    };
  }
}

export default function BlogPage({ blogPosts, categories, metadata }) {
  const items = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
  ];

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.ogImage} />
      </Head>
      <BlogLayout>
        <div className="px-4 w-full">
          <div className="w-full max-w-[90rem] mx-auto mt-8">
            <Breadcrumb items={items} />
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
      </BlogLayout>
    </>
  );
}