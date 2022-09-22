import { IUserCreate, IUser } from "../../interfaces/User";

import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/appError";

const userCreateService = async ({
  name,
  email,
  password,
  phone,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError(400, "Email already exists");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = bcrypt.hashSync(password, 10);
  user.phone = phone;
  user.created_at = new Date();

  userRepository.create(user);
  await userRepository.save(user);

  return { ...user, password: undefined };
};

export default userCreateService;
