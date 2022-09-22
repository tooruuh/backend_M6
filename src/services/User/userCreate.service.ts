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
  // verificação de email já em uso por outro usuário
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);
  // se já está em uso, invocamos um Error nativo do JS mesmo

  if (emailAlreadyExists) {
    throw new AppError(400, "Email already exists");
  }

  // se não, criamos um novo usuário no modelo da interface IUser,
  // usando os parâmetros que vamos receber lá do controller
  const user = new User();
  user.name = name;
  user.email = email;
  user.password = bcrypt.hashSync(password, 10);
  user.phone = phone;
  user.created_at = new Date();

  // adicionando o novo usuário na database
  userRepository.create(user);
  await userRepository.save(user);

  // retornamos o objeto do novo usuário de volta para o controller
  return { ...user, password: undefined };
};

export default userCreateService;
