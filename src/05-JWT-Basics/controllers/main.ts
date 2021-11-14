import { RequestHandler } from "express";

const login: RequestHandler = async (req, res) => {
  console.log(req.body);
  //   res.send("Fake login/Register/Signup");
  res.status(202).json({ msg: "Fake login/Register/Signup", token: "abcdef" });
};

const dashboard: RequestHandler = async (req, res) => {
  console.log(req.body);

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

export { login, dashboard };
