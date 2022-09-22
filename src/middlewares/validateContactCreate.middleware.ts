import { NextFunction, Request, Response } from "express";

const validateContactCreateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, contact } = req.body;

  if (!name || !email || !contact) {
    return res.status(400).json({
      message: "fill in all fields",
      fields_fill: {
        name: req.body.name || "Campo obrigatório",
        email: req.body.email || "Campo obrigatório",
        contact: req.body.contact || "Campo obrigatório",
      },
    });
  }

  next();
};

export default validateContactCreateMiddleware;
