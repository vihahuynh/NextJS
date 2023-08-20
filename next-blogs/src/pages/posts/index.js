import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-utils";

const AllPostsPage = (props) => {
  const { posts } = props;
  return <AllPosts posts={posts} />;
};

export default AllPostsPage;

export const getStaticProps = async () => {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
};
