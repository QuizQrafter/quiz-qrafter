import cors from "cors";
import express from "express";

const { PORT = "8080" } = process.env;

const app = express();

app.use(cors());

app.get("/healthz", (_req, res) => {
    return res.sendStatus(200);
});

const server = app.listen(parseInt(PORT), () => {
    console.log(`Live on PORT ${PORT}`);
});

process.on('SIGTERM', () => {
  console.debug('Closing HTTP server ...');
  server.close(() => {
    console.debug('HTTP server closed');
  });
})
