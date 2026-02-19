import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";
import clientRoutes from "./routes/clients.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use("/api/auth", authRoutes);
  app.use("/api/todos", todoRoutes);
  app.use("/api/clients", clientRoutes);

const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE_URL

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} and server start at ${DB}`);
});
