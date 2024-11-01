import Head from 'next/head';
import BlogDetail from "@/components/Blog/BlogDetail";
import { getBlogDetails } from "@/sanity-queries/blog-post";
import { urlFor } from "@/lib/sanity";
import BlogLayout from '@/components/Blog/BlogLayout';

export default function BlogDetailPage({ blogDetails, metadata }) {
  if (!blogDetails) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Head>
        {/* Essential Meta Tags */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:site_name" content="Candidace" />

        {/* Article Specific Meta Tags */}
        <meta property="article:published_time" content={metadata.publishedAt} />
        {metadata.updatedAt && (
          <meta property="article:modified_time" content={metadata.updatedAt} />
        )}
        {metadata.author && (
          <meta property="article:author" content={metadata.author} />
        )}
        {metadata.categories?.map((category, index) => (
          <meta key={index} property="article:tag" content={category} />
        ))}

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.ogImage} />

        {/* Additional Meta Tags */}
        {metadata.readingTime && (
          <meta property="article:reading_time" content={metadata.readingTime} />
        )}
        <link rel="canonical" href={metadata.url} />
      </Head>
      <BlogLayout>
        <main className="w-full px-4 py-8">
          <BlogDetail blog={blogDetails} />
        </main>
      </BlogLayout>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  try {
    if (!params?.slug) {
      return { notFound: true };
    }

    const blogDetails = await getBlogDetails(params.slug);

    if (!blogDetails) {
      return { notFound: true };
    }

    // Construct the base URL for absolute URLs
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const baseUrl = `${protocol}://${req.headers.host}`;
    const currentUrl = `${baseUrl}/blog/${params.slug}`;

    // Format dates for metadata
    const publishDate = blogDetails.publishedAt ? new Date(blogDetails.publishedAt).toISOString() : null;
    const updateDate = blogDetails.updatedAt ? new Date(blogDetails.updatedAt).toISOString() : null;

    // Prepare metadata with available content
    const metadata = {
      // Title with fallbacks
      title: blogDetails.seoTitle || `${blogDetails.title} | Candidace`,

      // Description with fallbacks
      description: blogDetails.seoDescription ||
        blogDetails.smallDescription ||
        `Read about ${blogDetails.title} on Candidace`,

      // Image handling
      ogImage: blogDetails.mainImage ?
        urlFor(blogDetails.mainImage).width(1200).height(630).url() :
        `${baseUrl}/default-og-image.jpg`,

      // Author information
      author: blogDetails.author?.name,

      // Categories
      categories: blogDetails.categories?.map(cat => cat.title) || [],

      // Dates
      publishedAt: publishDate,
      updatedAt: updateDate,

      // URL information
      url: currentUrl,

      // Additional metadata
      readingTime: blogDetails.estimatedReadingTime,

      // Structured data for SEO
      structuredData: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blogDetails.title,
        "description": blogDetails.smallDescription,
        "image": blogDetails.mainImage ? urlFor(blogDetails.mainImage).url() : null,
        "author": {
          "@type": "Person",
          "name": blogDetails.author?.name || "Unknown Author",
          "url": blogDetails.author?.slug ? `${baseUrl}/author/${blogDetails.author.slug}` : null
        },
        "datePublished": publishDate,
        "dateModified": updateDate || publishDate,
        "publisher": {
          "@type": "Organization",
          "name": "Candidace",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": currentUrl
        }
      }
    };

    return {
      props: {
        blogDetails,
        metadata
      }
    };
  } catch (error) {
    console.error('Error fetching blog details:', error);
    return { notFound: true };
  }
}