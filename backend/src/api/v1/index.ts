import { Router } from "express";
import session from "express-session";
import authRouter from "./auth";

const router = Router();

router.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false,
    secret: "shhhh, very secret",
  })
);

router.use("/auth", authRouter);

export default router;
