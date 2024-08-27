export const all_blog_url = () => `/blog`;
export const single_blog_url = (slug) => `/blog/slug/${slug}`;
export const single_blog_id_url = (id) => `/blog/${id}`;

export const all_category_url = () => `/blog/categories`;
export const all_blogs_of_category_url = (slug) => `/blog/categories/${slug}`;

export const all_blogs_of_author_url = (authorId) => `/blog/author/${authorId}`;
