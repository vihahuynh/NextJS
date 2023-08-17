const FeedbackDetailsPage = (props) => {
  return (
    <div>
      <p>Author: {props.feedback.email}</p>
      <p>{props.feedback.text}</p>
    </div>
  );
};

export default FeedbackDetailsPage;

export async function getStaticProps() {}
