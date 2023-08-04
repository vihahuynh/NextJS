import fs from "fs/promises";
import path from "path";

const HomePage = (props) => {
  return (
    <ul>
      {props.products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export default HomePage;

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
    revalidate: 60,
    notFound: false,
    redirect: {
      destination: "/no-data",
    },
  };
}
