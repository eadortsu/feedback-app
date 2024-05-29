import express from "express";
import { submitFeedback, getFeedback } from "../controllers/feedbackController";

const router = express.Router();

router.post("/feedback", submitFeedback);
router.get("/feedback", getFeedback);

export default router;
