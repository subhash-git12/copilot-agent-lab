import express from "express";
import mongoose from "mongoose";

const FRONTEND_PORT = 5173;
const BACKEND_PORT = 8000;
const MONGO_PORT = 27017;
const MONGO_HOST = process.env.MONGO_HOST ?? "localhost";
const MONGO_DB = process.env.MONGO_DB ?? "octofit";
const MONGO_URI = process.env.MONGO_URI ?? `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "OctoFit Tracker backend is running",
    frontendPort: FRONTEND_PORT,
    backendPort: BACKEND_PORT,
    mongoPort: MONGO_PORT,
  });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    app.listen(BACKEND_PORT, () => {
      console.log(`Backend server listening on http://localhost:${BACKEND_PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
