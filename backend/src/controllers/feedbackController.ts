import { Request, Response } from "express";
import Feedback from "../models/Feedback";
import Joi from "joi";

const feedbackSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  type: Joi.string().valid("Bug", "Suggestion").required(),
  message: Joi.string().min(10).required(),
});

export const submitFeedback = async (req: Request, res: Response) => {
  const { error } = feedbackSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, email, type, message } = req.body;
  const feedback = new Feedback({ name, email, type, message });
  try {
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ error: "Error submitting feedback" });
  }
};

export const getFeedback = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    type,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const filter: { [key: string]: any } = {};
  if (type) {
    filter.type = type;
  }

  const sortOrder = order === "asc" ? 1 : -1;

  try {
    const total = await Feedback.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));
    const feedbacks = await Feedback.find(filter)
      .sort({ [sortBy as string]: sortOrder })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      total,
      totalPages,
      currentPage: Number(page),
      pageSize: Number(limit),
      results: feedbacks,
    });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving feedback" });
  }
};
