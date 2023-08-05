const UserPage = (props) => {
  return <p>{props.id}</p>;
};

export default UserPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;
  return {
    props: {
      id: `userId ${userId}`,
    },
  };
}
