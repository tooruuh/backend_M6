import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);

  if (!account) {
    throw new AppError(401, "Wrong email/password!");
  }

  if (!bcrypt.compareSync(password, account.password)) {
    throw new AppError(401, "Wrong email/password!");
  }

  const token = jwt.sign(
    { email: email, id: account.id },
    String(process.env.JWT_SECRET),
    {
      expiresIn: "1d",
    }
  );

  return token;
};

export default userLoginService;
