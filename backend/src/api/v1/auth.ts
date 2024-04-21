import bcrypt from "bcrypt";
import { NextFunction, Request, Response, Router } from "express";
import prisma from "../../database";

const router = Router();

router.post("/signup", async (request, response) => {
  try {
    const { email, password, fullname } = request.body;

    if (!email || !password || !fullname) {
      return response.sendStatus(400 /* Bad Request */);
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        password: await hashPassword(password),
        fullname: fullname,
      },
    });

    return response.status(200 /* OK */).json({
      id: user.id,
      email: user.email,
      fullname: user.fullname,
    });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.sendStatus(400 /* Bad Request */);
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user === null || !(await verifyPassword(password, user.password))) {
      return response.sendStatus(404 /* Not Found */);
    }

    request.session.regenerate((error) => {
      if (error) {
        console.error("Error in [/login]:", error);
        return response.sendStatus(500 /* Internal Server Error */);
      }
      // @ts-ignore
      request.session.userId = user.id; // set the ID to know which user is making a request next time

      return response.status(200).json({
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      });
    });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
});

router.post("/logout", (request, response) => {
  try {
    request.session.destroy((error) => {
      if (error) {
        console.error("Error in [/logout]:", error);
        return response.sendStatus(500);
      }

      return response.sendStatus(200);
    });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
});

router.get("/info", restrict, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.session.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user === null) return res.sendStatus(404 /* Not Found */);

    return res.status(200).json({
      email: user.email,
      fullname: user.fullname,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export function restrict(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  // @ts-ignore
  if (request.session.userId) {
    return next();
  } else {
    return response.sendStatus(401 /* Unauthorized */);
  }
}

async function hashPassword(plainPassword: string): Promise<string> {
  return await bcrypt.hash(plainPassword, 10);
}

async function verifyPassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export default router;
