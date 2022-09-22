import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

const validateUserIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);
  const userId = req.userId;

  const { id } = req.params;

  const users = await userRepository.find();

  const idExist = users.find((user) => user.id === id);

  if (!idExist) {
    return res.status(404).json({ message: "user not found" });
  }

  if (id !== userId) {
    return res.status(401).json({
      message: "you cannot update/delete a user other than you",
    });
  }

  next();
};

export default validateUserIdMiddleware;
