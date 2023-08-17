import { useRef, useState } from "react";
import fs from "fs/promises";
import path from "path";

const HomePage = () => {
  const [feedback, setFeedback] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        text: enteredFeedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const loadFeedback = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedback(data.data));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="label">Your email address</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea rows={4} type="text" id="feedback" ref={feedbackRef} />
        </div>
        <button>Send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedback}>Load feedback</button>
      <ul>
        {feedback?.map((f) => (
          <li key={f.id}>{f.text}</li>
        ))}
      </ul>
    </>
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
    // notFound: false,
    // redirect: {
    //   destination: "/no-data",
    // },
  };
}
