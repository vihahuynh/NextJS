import Link from "next/link";

const ClientPage = () => {
  const clients = [
    {
      id: "max",
      name: "Max",
    },
    {
      id: "nemo",
      name: "Nemo",
    },
  ];
  return (
    <div>
      <h1>The Client Page</h1>
      <ul>
        {clients.map((client) => (
          <li id={client.id}>
            <Link
              href={{
                pathname: "clients/[id]",
                query: { id: client.id },
              }}>
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientPage;
