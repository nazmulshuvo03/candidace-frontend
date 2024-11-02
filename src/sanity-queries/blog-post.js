import { client } from "@/lib/sanity";

export async function getAllBlogPosts() {
    try {
        const query = `*[
            _type == "post" && 
            defined(status) &&  
            status == "published" && 
            defined(publishedAt) &&  
            publishedAt <= now() &&
            !(_id in path('drafts.**'))
        ] | order(orderRank) {
            _id,
            _type,
            title,
            status, 
            smallDescription,
            mainImage,
            'slug': slug.current,
            publishedAt,
            seoTitle,
            seoDescription,
            tags,
            "category": category->{
                _id,
                title,
                'slug': slug.current
            },
            "author": author->{
                _id,
                name,
                username,
                'slug': slug.current,
                avatar
            },
        }`

        const data = await client.fetch(query);

        if (!data || data.length === 0) {
            console.warn("No published posts found");
            return [];
        }

        // Process posts to ensure uniqueness
        const uniquePosts = Array.from(
            new Map(data.map(post => [post._id, post])).values()
        );

        return uniquePosts;
    } catch (error) {
        console.error("Error details:", {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        throw error;
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
            "category": category->{
                _id,
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
            seoTitle,
            seoDescription,
            faqs,
        }`

        const data = await client.fetch(query);

        if (!data) {
            throw new Error("No data found");
        }

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch blog post data"); 
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
            'postCount': count(*[_type == "post" && status == "published" && category._ref == ^._id]),
            'parentCategory': parentCategory->{
                _id,
                title,
                'slug': slug.current
            },
            'subcategories': *[_type == "category" && references(^._id) in parentCategory[]._ref] {
                _id,
                title,
                'slug': slug.current,
                'postCount': count(*[_type == "post" && status == "published" && category._ref == ^._id])
            }
        }
        `;

        const data = await client.fetch(query);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch categories");
    }
}

export async function getBlogPostsByCategory(categorySlug) {
    try {
        const query = `*[_type == "post" && 
            references(*[_type=="category" && slug.current == $categorySlug]._id) &&
            defined(status) &&  // Ensure status field exists
            status == "published" && 
            defined(publishedAt) &&  // Ensure publishedAt field exists
            publishedAt <= now() &&
            !(_id in path('drafts.**'))
        ] | order(orderRank) {
        _id,
        title,
        smallDescription,
        mainImage,
        'slug': slug.current,
        publishedAt,
        seoTitle,
        seoDescription,
        "category": category->{
            _id,
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

        console.log('author: ', author)

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
            seoTitle,
            seoDescription,
            "category": category->{
                _id,
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

        console.log('posts: ', posts)

        return {
            author,
            posts: posts || []
        };
    } catch (error) {
        console.error('Error fetching author posts:', error);
        throw error;
    }
}