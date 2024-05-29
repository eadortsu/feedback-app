import { Schema, model } from "mongoose";

const feedbackSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Feedback", feedbackSchema);
