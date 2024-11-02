import Head from 'next/head';
import BlogList from "@/components/Blog/BlogList";
import Breadcrumb from "@/components/Blog/Breadcrumb";
import { getBlogPostsByAuthor } from "@/sanity-queries/blog-post";
import { urlFor } from '@/lib/sanity';
import BlogLayout from '@/components/Blog/BlogLayout';

export default function AuthorBlogsPage({ author, posts, metadata }) {
  const items = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
    { 
      label: author.username || author.name, 
      url: `/blog/author/${author.slug}` 
    },
  ];

  if (!author) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Author Not Found</h1>
        <p>The author you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={author.name} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        {metadata.ogImage && (
          <>
            <meta property="og:image" content={metadata.ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${author.name}'s profile`} />
          </>
        )}
        
        {/* Profile-specific Open Graph Tags */}
        <meta property="profile:first_name" content={author.name.split(' ')[0]} />
        <meta property="profile:last_name" content={author.name.split(' ').slice(1).join(' ')} />
        <meta property="profile:username" content={author.username || author.name} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        {metadata.ogImage && <meta name="twitter:image" content={metadata.ogImage} />}
        
        {/* Canonical URL */}
        <link rel="canonical" href={metadata.url} />
        
        {/* Schema.org structured data */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(metadata.structuredData) 
          }} 
        />
      </Head>
      <BlogLayout>
        <div className="px-4 w-full">
            <div className="w-full max-w-[90rem] mx-auto mt-8">
            <Breadcrumb items={items} />
            <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                <span>Blogs by</span>{" "}
                <span className="text-secondary">
                    {author.username ? `${author.name}` : author.name}
                </span>
                </h1>
            </div>
            <div>
                {posts.length > 0 ? (
                <BlogList blogs={posts} gridCols="four" />
                ) : (
                <p className="mt-8 text-gray-500">
                    No blog posts found for this author.
                </p>
                )}
            </div>
            </div>
        </div>
      </BlogLayout>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  try {
    const { author, posts } = await getBlogPostsByAuthor(params.slug);

    // Log more context
    console.log('Params slug:', params.slug);
    console.log('Author found:', !!author);
    console.log('Posts count:', posts.length);

    if (!author) {
      console.warn(`No author found for slug: ${params.slug}`);
      return { 
        notFound: true,
        props: {} 
      };
    }

    // Construct the base URL
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${req.headers.host}`;
    const currentUrl = `${baseUrl}/blog/author/${params.slug}`;

    // Get the latest and most popular posts
    const sortedPosts = [...posts].sort((a, b) => 
      new Date(b.publishedAt) - new Date(a.publishedAt)
    );
    const latestPost = sortedPosts[0];

    // Generate dynamic description based on author's content
    const description = generateAuthorDescription(author, posts);

    // Prepare metadata
    const metadata = {
      title: generateTitle(author, posts.length),
      description,
      url: currentUrl,
      ogImage: author.avatar ? 
               urlFor(author.avatar).width(1200).height(630).url() :
               latestPost?.mainImage ?
               urlFor(latestPost.mainImage).width(1200).height(630).url() :
               `${baseUrl}/default-og-image.jpg`,
      type: 'profile',
      structuredData: generateStructuredData({
        author,
        posts,
        baseUrl,
        currentUrl,
      })
    };

    return {
      props: {
        author,
        posts,
        metadata
      }
    };
  } catch (error) {
    console.error('Detailed error in getServerSideProps:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return { notFound: true };
  }
}

// Helper functions for metadata generation
function generateTitle(author, postCount) {
  const authorName = author.name;
  return postCount > 0
    ? `${authorName}'s Articles (${postCount}) | Candidace`
    : `${authorName}'s Profile | Candidace`;
}

function generateAuthorDescription(author, posts) {
  const postCount = posts.length;
  const categories = [...new Set(posts.map(post => 
    post.category?.title
  ))].filter(Boolean);
  
  const categoryText = categories.length > 0
    ? ` specializing in ${categories.slice(0, 3).join(', ')}`
    : '';

  return postCount > 0
    ? `Explore ${postCount} articles by ${author.name}${categoryText}. Find expert insights and the latest posts on our blog.`
    : `Discover articles and insights from ${author.name} on our blog.`;
}

function generateStructuredData({ author, posts, baseUrl, currentUrl }) {

  const categories = [...new Set(posts.map(post => 
    post.category?.title
  ))].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": author.name,
      "alternateName": author.username,
      "url": currentUrl,
      "image": author.avatar ? urlFor(author.avatar).url() : null,
      "knowsAbout": categories,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": currentUrl
      },
      "sameAs": [], // Could be expanded with social media links if added to author schema
      "worksFor": {
        "@type": "Organization",
        "name": "Candidace",
        "url": baseUrl
      },
      "author": posts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "url": `${baseUrl}/blog/${post.slug}`,
        "datePublished": post.publishedAt,
        "description": post.smallDescription,
        "image": post.mainImage ? urlFor(post.mainImage).url() : null
      }))
    }
  };
}