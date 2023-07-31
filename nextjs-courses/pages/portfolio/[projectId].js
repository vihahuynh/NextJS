import { useRouter } from "next/router";

const PortfolioProjectPage = () => {
  const router = useRouter();
  const projectId = router.query.projectId;
  return (
    <div>
      <h1>The Portfolio Project Page</h1>
      <p>{projectId}</p>
    </div>
  );
};

export default PortfolioProjectPage;
