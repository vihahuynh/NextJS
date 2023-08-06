import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = () => {
  const [lastSales, setLastSales] = useState([]);
  const { data, error } = useSWR(
    "https://nextjs-courses-d5fd0-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    const transformedData = [];
    if (data) {
      for (const key in data) {
        transformedData.push({
          id: key,
          ...data[key],
        });
      }
    }
    setLastSales(transformedData);
  }, [data]);

  if (error) return <p>Failed to load</p>;
  if (!data || !lastSales) return <p>Loading...</p>;

  return (
    <ul>
      {lastSales?.map((sale) => (
        <li key={sale.id}>
          <p>Username: {sale.username}</p>
          <p>Volume: {sale.volume}</p>
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;
