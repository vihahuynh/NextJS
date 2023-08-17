import fs from "fs";
import path from "path";

export const extractFeedbacks = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

function handler(req, res) {
  if (req.method === "POST") {
    const { email, text } = req.body;
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const newFeedback = { id: new Date().toISOString(), email, text };
    const data = extractFeedbacks(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return res.status(201).json({ message: "success", newFeedback });
  } else if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const data = extractFeedbacks(filePath);
    return res.status(200).json({ message: "success", data });
  }
  return res.status(200).json({ message: "OK nah" });
}
export default handler;
