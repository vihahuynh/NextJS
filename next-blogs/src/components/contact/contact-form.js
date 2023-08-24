import { useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

const sendContactData = async (newMessage) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(newMessage),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
};

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(); // pending, success, error
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    try {
      const newMessage = {
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      };
      // add client side validation
      setRequestStatus("pending");
      await sendContactData(newMessage);
      setRequestStatus("success");
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (err) {
      setRequestStatus("error");
      setRequestError(err.message);
    }
  };

  let notiMessage;
  if (requestStatus === "pending") {
    notiMessage = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notiMessage = {
      status: "success",
      title: "Success.",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notiMessage = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            rows={5}
            required
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>Send message</button>
        </div>
      </form>
      {notiMessage && (
        <Notification
          status={notiMessage.status}
          title={notiMessage.title}
          message={notiMessage.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
