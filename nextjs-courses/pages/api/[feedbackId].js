import path from "path";
import { extractFeedbacks } from "./feedback";

function handler(req, res) {
  if (req.method === "GET") {
    const { feedbackId } = req.query;
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const data = extractFeedbacks(filePath);
    const foundFeedback = data.find((f) => f.id === feedbackId);
    if (!foundFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    return res
      .status(200)
      .json({ message: "success", feedback: foundFeedback });
  }
  return res.status(200).json({ message: "OK nah" });
}
export default handler;
