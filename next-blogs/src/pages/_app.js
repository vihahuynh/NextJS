import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="ưidht=device-width, initial-slace=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
