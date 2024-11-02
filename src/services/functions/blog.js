import { fetchContent, postContent, putContent } from "../api";
import {
  all_blog_url,
  all_blogs_of_author_url,
  all_blogs_of_category_url,
  all_category_url,
  single_blog_id_url,
  single_blog_url,
} from "../urls/blog";

export const fetchAllBlogs = async () => {
  const res = await fetchContent(all_blog_url());
  // console.log("all blogs response: ", res);
  if (res.success) {
    return res;
  } else return null;
};

export const fetchSingleBlog = async (slug) => {
  const res = await fetchContent(single_blog_url(slug));
  // console.log("single blogs response: ", res);
  if (res.success) {
    return res;
  } else return null;
};

export const createBlog = async (blogData) => {
  const res = await postContent(all_blog_url(), blogData);
  console.log("create blog response: ", res);
  if (res.success) {
    return res;
  } else return null;
};

export const updateBlog = async (blogId, blogData) => {
  const res = await putContent(single_blog_id_url(blogId), blogData);
  console.log("update blog response: ", res);
  if (res.success) {
    return res;
  } else return null;
};

export const fetchAllCategories = async () => {
  const res = await fetchContent(all_category_url());
  // console.log("all categories response: ", res);
  if (res.success) {
    return res;
  } else return null;
};

export const createCategory = async (catData) => {
  const res = await postContent(all_category_url(), catData);
  console.log("create category response: ", res);
  if (res.success) {
    return res;
  } else return null;
};

export const fetchBlogsOfCategory = async (slug) => {
  const res = await fetchContent(all_blogs_of_category_url(slug));
  console.log("all blogs of category response: ", res);
  if (res.success) {
    return res;
  } else return null;
};

export const fetchBlogsOfAuthor = async (authorId) => {
  const res = await fetchContent(all_blogs_of_author_url(authorId));
  console.log("all blogs of author response: ", res);
  if (res.success) {
    return res;
  } else return null;
};
