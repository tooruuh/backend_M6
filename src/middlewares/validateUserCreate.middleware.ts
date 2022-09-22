import { NextFunction, Request, Response } from "express";

const validateUserCreateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      message: "fill in all fields",
      fields_fill: {
        name: req.body.name || "Campo obrigatório",
        email: req.body.email || "Campo obrigatório",
        password: req.body.password || "Campo obrigatório",
        phone: req.body.phone || "Campo obrigatório",
      },
    });
  }

  next();
};

export default validateUserCreateMiddleware;
