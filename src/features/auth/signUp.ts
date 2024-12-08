import dotenv from "dotenv";
dotenv.config();
import { AppError } from "../../domain/errors/AppError";
import { encryptPassword } from "../../libs/bcrypt";
import { Account } from "../../domain/auth/userAccount";
import { accountRepo } from "../../@common/constants/objects";

export const signUp = async (accountInfo: Account) => {
  console.log("An Acount is been created..");
  const { email, username, password } = accountInfo;

  if (await accountRepo.findByEmail(email)) throw new AppError(`An account with this email:${email} exist`, 409);
  else if (await accountRepo.findByUsername(username)) throw new AppError(`An account with this username: ${username} exist`, 409);

  if (password) {
    console.log("Encrypting password..");
    accountInfo.password = await encryptPassword(accountInfo.password);
    console.log("Password encrypted");
  }
  await accountRepo.create(accountInfo);
};
