//src/sanity-queries/blog-post.js\
import { client } from "@/lib/sanity";

export async function getAllBlogPosts() {
    try {
        const query = `*[_type == "post"] | order(orderRank){
            _id,
            title,
            smallDescription,
            mainImage,
            'slug': slug.current,
            publishedAt,
            "category": categories[]->{
                title,
                'slug': slug.current
            },
            "author": author->{
                _id,
                name,
                username,
                'slug': slug.current,
                avatar
            }
        }`

        const data = await client.fetch(query);

        if (!data) {
            throw new Error("No data found");
        }

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch about us data");
    }
}

export async function getBlogDetails(slug) {
    console.log('slug: ', slug)
    try {
        const query = `*[_type == "post" && slug.current == "${slug}"][0]{
            _id,
            title,
            smallDescription,
            mainImage,
            'slug': slug.current,
            "categories": categories[]->{
                title,
                'slug': slug.current
            },
            "author": author->{
                name,
                username,
                'slug': slug.current,
                avatar
            },
            publishedAt,
            updatedAt,
            content,
            estimatedReadingTime,
            faqs,
        }`

        const data = await client.fetch(query);

        if (!data) {
            throw new Error("No data found");
        }

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch blog post data"); // Updated error message to be more specific
    }
}

export async function getAllCategories() {
    try {
        const query = `
        *[_type == "category"] | order(orderRank) {
            _id,
            title,
            'slug': slug.current,
            description,
            'postCount': count(*[_type == "post" && references(^._id)]),
            'parentCategory': parentCategory->{
                _id,
                title,
                'slug': slug.current
            },
            'subcategories': *[_type == "category" && references(^._id) in parentCategory[]._ref] {
                _id,
                title,
                'slug': slug.current,
                'postCount': count(*[_type == "post" && references(^._id)])
            }
        }
        `

        const data = await client.fetch(query);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch categories");
    }
}

export async function getBlogPostsByCategory(categorySlug) {
    try {
        const query = `*[_type == "post" && references(*[_type=="category" && slug.current == $categorySlug]._id)] | order(orderRank) {
        _id,
        title,
        smallDescription,
        mainImage,
        'slug': slug.current,
        publishedAt,
        "category": categories[]->{
          title,
          'slug': slug.current
        },
        "author": author->{
          name,
          username,
          'slug': slug.current,
          avatar
        }
      }`

        const data = await client.fetch(query, { categorySlug });

        if (!data) {
            throw new Error("No posts found for this category");
        }

        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch category posts");
    }
}

export async function getCategoryBySlug(slug) {
    try {
        const query = `*[_type == "category" && slug.current == $slug][0] {
        _id,
        title,
        'slug': slug.current,
        description,
        'postCount': count(*[_type == "post" && references(^._id)]),
        'parentCategory': parentCategory->{
          _id,
          title,
          'slug': slug.current
        }
      }`

        const data = await client.fetch(query, { slug });
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch category");
    }
}

export async function getBlogPostsByAuthor(authorSlug) {
    try {
        // First, get the author info
        const authorQuery = `*[_type == "author" && slug.current == $authorSlug][0]{
            _id,
            name,
            username,
            'slug': slug.current,
            avatar
        }`;

        const author = await client.fetch(authorQuery, { authorSlug });

        if (!author) {
            return { author: null, posts: [] };
        }

        // Then get all posts by this author
        const postsQuery = `*[_type == "post" && author._ref == $authorId] {
            _id,
            title,
            smallDescription,
            mainImage,
            'slug': slug.current,
            publishedAt,
            "category": categories[]->{
                title,
                'slug': slug.current
            },
            "author": author->{
                name,
                username,
                'slug': slug.current,
                avatar
            }
        }`;

        const posts = await client.fetch(postsQuery, { authorId: author._id });

        return {
            author,
            posts: posts || []
        };
    } catch (error) {
        console.error('Error fetching author posts:', error);
        throw error;
    }
}

// *[_type == "post"][0]{
//     _id,
//     title,
//     slug,
//     author,
//     status,
//     smallDescription,
//     mainImage,
//     categories,
//     publishedAt,
//     updatedAt,
//     content,
//     estimatedReadingTime,
//   }

// *[_type == "category"] | order(orderRank) {
//     _id,
//     title,
//     "slug": slug.current,
//     description,
//     "subcategories": *[_type == "category" && references(^._id)] {
//       _id,
//       title,
//       "slug": slug.current,
//       description
//     }
// }