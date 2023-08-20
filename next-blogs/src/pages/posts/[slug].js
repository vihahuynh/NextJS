import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/lib/posts-utils";

const PostDetailsPage = (props) => {
  const { post } = props;
  return <PostContent post={post} />;
};

export default PostDetailsPage;

export const getStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params;

  const post = getPostData(slug);
  return {
    props: {
      post,
    },
    revalidate: 6000,
  };
};

export const getStaticPaths = async () => {
  const postFiles = getPostsFiles();
  const slugs = postFiles.map((file) => file.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: "blocking",
  };
};
