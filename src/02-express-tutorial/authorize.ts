import { RequestHandler } from "express";

declare global {
  namespace Express {
    export interface Request {
      user: { name: string; id: number };
    }
  }
}

const authorize: RequestHandler = (req, res, next) => {
  // console.log("authorize");
  const { user } = req.query;
  if (user === "john") {
    req.user = { name: "john", id: 3 };
    next();
  } else {
    res.status(401).send("Unauthorized");
  }

  //   next();
};
export default authorize;
