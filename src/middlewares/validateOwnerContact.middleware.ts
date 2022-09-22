import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contact.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

const validateOwnerContactMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, id_contact } = req.params;

  const userRepository = AppDataSource.getRepository(User);
  const userList = await userRepository.find();
  const user = userList.find((user) => user.id === id);

  const userContactsId = user?.contacts.map(
    (element) => element.id === id_contact
  );

  const verifyContact = userContactsId?.includes(true);

  if (!verifyContact) {
    return res
      .status(401)
      .json({ message: "you cannot update/delete a contact other than you" });
  }

  next();
};

export default validateOwnerContactMiddleware;
