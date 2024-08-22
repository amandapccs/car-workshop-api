import express, { Request, Response } from "express";
import { mongoConnect, mongoDisconnect } from "./database/mongoose-connect";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// Conectar ao MongoDB
mongoConnect();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Desconectar do MongoDB
const gracefulShutdown = async () => {
  console.log("Shutting down gracefully...");
  await mongoDisconnect();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
