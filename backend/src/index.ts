import cors from "cors"
import express from "express"

import v1Router from "./api/v1"
import prisma from "./database"

const { PORT = "8080", FRONTEND_URL } = process.env

const app = express()

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1) // trust first proxy
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
)

app.get("/healthz", (_req, res) => {
  return res.sendStatus(200)
})

app.use("/api/v1", v1Router)

const server = app.listen(parseInt(PORT, 10), () => {
  console.log(`Live on PORT ${PORT}`)
})

server.on("close", () => {
  prisma.$disconnect()
})

process.on("SIGTERM", () => {
  console.debug("Closing HTTP server ...")
  server.close(() => {
    console.debug("HTTP server closed")
  })
})
