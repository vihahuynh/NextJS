import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input." });
    }

    const newMessage = { email, name, message };
    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://<username>:<password>@cluster0.ktqca.mongodb.net/next-blogs"
      );
    } catch (err) {
      console.log("err: ", err);
      return res.status(500).json({ message: "Something went wrong" });
    }

    const db = client.db();
    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (err) {
      return res.status(500).json({ message: "Storing message failed!" });
    }

    return res
      .status(201)
      .json({ message: "Sucessfully stored message!" }, newMessage);
  }
};

export default handler;
