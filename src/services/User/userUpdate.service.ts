import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";
import { IUserUpdate } from "../../interfaces/User";
import { AppError } from "../../errors/appError";

const userUpdateService = async ({
  id,
  name,
  email,
  password,
  phone,
}: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(404, "Not found user");
  }

  const userUpdate = {
    name: name || user.name,
    email: email || user.email,
    password: user.password,
    phone: phone || user.phone,
  };

  password && (userUpdate.password = bcrypt.hashSync(password, 10));

  await userRepository.update(user!.id, {
    ...userUpdate,
  });

  return { ...userUpdate };
};

export default userUpdateService;
