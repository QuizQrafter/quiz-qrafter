import { spawn } from "node:child_process";
import http from "node:http";
import { stderr } from "node:process";

const { PORT = "8081" } = process.env;

/**
  * @param req {http.IncomingMessage}
  * @param res {http.ServerResponse}
*/
function healthz(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end();
}

/**
  * @param req {http.IncomingMessage}
  * @param res {http.ServerResponse}
*/
function fallback(req, res) {
  res.writeHead(404);
  res.end();
}

/**
  * @param req {http.IncomingMessage}
  * @param res {http.ServerResponse}
*/
function convert(req, res) {
  const proc = spawn("pandoc", ["-f", "markdown", "-t", "pdf"]);
  proc.on("close", (exitCode) => {
    if (exitCode !== 0) {
      console.error(`pandoc process exited with code ${exitCode}`);
    }
  });
  proc.on("error", (err) => {
    res
      .writeHead(500, { "Content-Type": "text/plain" })
      .end(http.STATUS_CODES[500])
    console.error(err);
  });
  proc.stderr
    .once("data", () =>
      res
        .writeHead(500, { "Content-Type": "text/plain" })
        .end(http.STATUS_CODES[500]))
    .pipe(stderr);
  proc.stdout
    .once("data", () =>
      res.writeHead(200, { "Content-Type": "application/octet-stream" }))
    .pipe(res);
  req.pipe(proc.stdin, { end: true });
}

http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  switch (url.pathname.slice(1)) {
    case "convert":
      convert(req, res);
      break;
    case "healthz":
      healthz(req, res);
      break;
    default:
      fallback(req, res);
      break;
  }
})
  .listen(parseInt(PORT), () => {
    console.log("Server started!");
  });

process.on('SIGINT', function() {
  console.log("Shutting down the server");
  process.exit(0);
});
