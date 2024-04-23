import { Router } from "express";
import session, { MemoryStore, Store } from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import authRouter from "./auth";
import documentRouter from "./document";
import quizRouter from "./quiz";

const { SESSION_SECRET = "secret", DOMAIN = "localhost", REDIS_URL } = process.env;

const router = Router();

let sessionStore: Store;
if (REDIS_URL !== undefined || REDIS_URL !== "") {
    const redisClient = createClient({
        url: REDIS_URL,
    });
    redisClient.on('error', (err) => {
        console.error('Could not establish a connection with redis. ' + err);
    });
    redisClient.on('connect', () => {
        console.log('Connected to redis successfully');
    });
    redisClient.connect().catch((err) => console.error(err));
    sessionStore = new RedisStore({
        client: redisClient,
    });
} else {
    sessionStore = new MemoryStore();
}

router.use(
  session({
    store: sessionStore,
    resave: false, // don't save session if unmodified
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
       maxAge: 10 * 60 * 1000, // 10 minutes
       domain: DOMAIN,
    }
  }),
);

router.use("/auth", authRouter);
router.use("/document", documentRouter);
router.use("/quiz", quizRouter);

export default router;
