import { Router } from "express";
import session from "express-session";
import authRouter from "./auth";
import documentRouter from "./document";
import quizRouter from "./quiz";

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
router.use("/document", documentRouter);
router.use("/quiz", quizRouter);

export default router;
