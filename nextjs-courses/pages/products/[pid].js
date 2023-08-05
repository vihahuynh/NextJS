import fs from "fs/promises";
import path from "path";

const ProductDetailsPage = ({ product }) => {
  if (!product) {
    return { notFound: true };
  }
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();

  const product = data.products.find((p) => p.id === productId);
  if (!product) {
    return <p>Loading...</p>;
  }

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((p) => p.id);
  const pathWithParams = ids.map((id) => ({
    params: {
      pid: id,
    },
  }));

  return {
    paths: pathWithParams,
    fallback: true,
  };
}

export default ProductDetailsPage;
