import BlogAuthorDashboard from "@/components/Blog/Author";
import EditBlogPage from "@/components/Blog/Author/EditBlog";
import NewBlogPage from "@/components/Blog/Author/NewBlog";

const Author = ({ slugs = [] }) => {
  const secondSlug = slugs[1];
  return (
    <>
      {secondSlug === "new" ? (
        <NewBlogPage />
      ) : secondSlug === "edit" ? (
        <EditBlogPage slug={slugs[2]} />
      ) : (
        <BlogAuthorDashboard />
      )}
    </>
  );
};

export default Author;
