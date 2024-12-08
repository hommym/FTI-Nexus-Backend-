import { accountRepo } from "../../@common/constants/objects";
import { AppError } from "../../domain/errors/AppError";

export const checkUsername = async (username: string) => {
  if (await accountRepo.findByUsername(username)) throw new AppError(`Username not avaialable`, 409);
};
