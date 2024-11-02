import BlogHeader from "@/components/Blog/BlogHeader";
import BlogLayout from "@/components/Blog/BlogLayout";
import BlogList from "@/components/Blog/BlogList"
import Breadcrumb from "@/components/Blog/Breadcrumb";
import CategoryList from "@/components/Blog/CategoryList"
import { urlFor } from "@/lib/sanity";
import { getBlogPostsByCategory, getAllCategories, getCategoryBySlug } from "@/sanity-queries/blog-post"
import Head from "next/head";

export default function CategoryPage({ blogPosts, categories, currentCategory, metadata }) {
  const items = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
    { label: currentCategory.title, url: `/blog/category/${currentCategory.slug}` },
  ];

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        {metadata.ogImage && <meta property="og:image" content={metadata.ogImage} />}
        {metadata.ogImage && <meta property="og:image:width" content="1200" />}
        {metadata.ogImage && <meta property="og:image:height" content="630" />}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        {metadata.ogImage && <meta name="twitter:image" content={metadata.ogImage} />}

        {/* Canonical URL */}
        <link rel="canonical" href={metadata.url} />

        {/* Schema.org Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(metadata.schema)
          }}
        />
      </Head>
      <BlogLayout>
        <div className="px-4 w-full">
          <div className="w-full max-w-[90rem] mx-auto mt-8">
            <Breadcrumb items={items} />
            <BlogHeader
              title={currentCategory.title}
              description={currentCategory.description || `Explore our ${currentCategory.title} articles and insights`}
            />
            <div className="w-full grid grid-cols-1 lg:grid-cols-4 sm:gap-7">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <BlogList blogs={blogPosts} />
              </div>
              <div className="lg:col-span-1 pt-5 lg:py-8 order-1 lg:order-2">
                <CategoryList categories={categories} currentCategorySlug={currentCategory.slug} />
              </div>
            </div>
          </div>
        </div>
      </BlogLayout>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  try {
    const [blogPosts, categories, currentCategory] = await Promise.all([
      getBlogPostsByCategory(params.slug),
      getAllCategories(),
      getCategoryBySlug(params.slug)
    ]);

    console.log('currentCategory: ', currentCategory)
    console.log('getBlogPostsByCategory: ', getBlogPostsByCategory)

    if (!currentCategory) {
      return { notFound: true };
    }

    // Construct the base URL
    // const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const protocol = 'https';
    const baseUrl = `${protocol}://${req.headers.host}`;
    const currentUrl = `${baseUrl}/blog/category/${params.slug}`;

    // Get post count and latest post
    const postCount = blogPosts.length;
    const latestPost = blogPosts[0];
    const oldestPost = blogPosts[blogPosts.length - 1];

    // Generate category-specific keywords
    const keywords = [
      currentCategory.title,
      ...blogPosts.slice(0, 5).flatMap(post => post.tags || []),
      'blog',
      'articles'
    ].filter(Boolean);

    // Prepare metadata
    const metadata = {
      title: generateTitle(currentCategory, postCount),
      description: generateDescription(currentCategory, latestPost, postCount),
      keywords: keywords.join(', '),
      url: currentUrl,
      ogImage: selectOgImage(latestPost, baseUrl),
      type: 'website',
      schema: generateSchemaMarkup({
        category: currentCategory,
        posts: blogPosts,
        baseUrl,
        currentUrl,
        latestPost,
        oldestPost
      })
    };

    return {
      props: {
        blogPosts,
        categories,
        currentCategory,
        metadata
      }
    };
  } catch (error) {
    console.error('Error loading category page:', error);
    return { notFound: true };
  }
}

// Helper functions for metadata generation
function generateTitle(category, postCount) {
  if (category.seoTitle) return category.seoTitle;

  return `${category.title} Articles (${postCount}) | Candidace`;
}

function generateDescription(category, latestPost, postCount) {
  if (category.seoDescription) return category.seoDescription;

  const baseDescription = category.description ||
    `Explore our collection of ${category.title} articles and insights`;

  return `${baseDescription}. Features ${postCount} articles${latestPost ? `, including "${latestPost.title}"` : ''
    }.`;
}

function selectOgImage(latestPost, baseUrl) {
  return latestPost?.mainImage ?
    urlFor(latestPost.mainImage).width(1200).height(630).url() :
    `${baseUrl}/default-og-image.jpg`;
}

function generateSchemaMarkup({ category, posts, baseUrl, currentUrl, latestPost, oldestPost }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "headline": category.title,
    "description": category.description,
    "url": currentUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Candidace",
      "url": baseUrl
    },
    "datePublished": oldestPost?.publishedAt || null,
    "dateModified": latestPost?.publishedAt || null,
    "about": {
      "@type": "Thing",
      "name": category.title,
      "description": category.description
    },
    "hasPart": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `${baseUrl}/blog/${post.slug}`,
      "datePublished": post.publishedAt || null,
      "author": {
        "@type": "Person",
        "name": post.author?.name || null
      }
    }))
  };
}