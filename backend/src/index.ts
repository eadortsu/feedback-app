import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import feedbackRoutes from "./routes/feedbackRoutes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

mongoose
  .connect(mongodbUri)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.use("/api", feedbackRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);

export default app;