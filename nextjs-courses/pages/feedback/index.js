import { useState } from "react";
import { extractFeedbacks } from "../api/feedback";
import path from "path";

const FeedbackPage = (props) => {
  const [feedbackDetails, setFeedbackDetails] = useState();
  const loadFeedbackDetails = (id) => {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedbackDetails(data.feedback));
  };
  return (
    <>
      <ul>
        {props?.feedback?.map((f) => (
          <li key={f.id}>
            {f.text}
            <button onClick={() => loadFeedbackDetails(f.id)}>
              show details
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <div>Details: {feedbackDetails?.text}</div>
    </>
  );
};

export default FeedbackPage;

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const data = extractFeedbacks(filePath);
  return {
    props: {
      feedback: data,
    },
  };
  //   return res.status(200).json({ message: "success", data });
}
