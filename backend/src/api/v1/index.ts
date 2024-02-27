import { Router } from "express";
import session from "express-session";
import authRouter from "./auth";

const { SESSION_SECRET = "secret" } = process.env;

const router = Router();

router.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false,
    secret: SESSION_SECRET,
  }),
);

router.use("/auth", authRouter);

export default router;
