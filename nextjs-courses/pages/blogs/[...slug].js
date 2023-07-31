import { useRouter } from "next/router";

const BlogPostPage = () => {
  const router = useRouter();
  console.log("query: ", router.query);
  return (
    <div>
      <h1>The Blog Post Page</h1>
    </div>
  );
};

export default BlogPostPage;
