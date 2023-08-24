import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { getFeaturePosts } from "../lib/posts-utils";
import Head from "next/head";

const HomePage = (props) => {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>Max;s blog</title>
        <meta
          name="description"
          content="I post about programming and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const featuredPosts = getFeaturePosts();
  return {
    props: {
      posts: featuredPosts,
    },
  };
};
