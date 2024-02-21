import cors from "cors";
import express from "express";

import prisma from "./database";
import v1Router from "./api/v1";

const { PORT = "8080" } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/healthz", (_req, res) => {
  return res.sendStatus(200);
});

app.use("/api/v1", v1Router);

const server = app.listen(parseInt(PORT), () => {
  console.log(`Live on PORT ${PORT}`);
});

server.on("close", () => {
  prisma.$disconnect();
});

process.on("SIGTERM", () => {
  console.debug("Closing HTTP server ...");
  server.close(() => {
    console.debug("HTTP server closed");
  });
});
