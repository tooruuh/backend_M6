import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const contactListService = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);

  return account?.contacts;
};

export default contactListService;
