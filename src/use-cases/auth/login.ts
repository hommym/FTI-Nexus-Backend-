import { accountRepo } from "../../@common/constants/objects";
import { AppError } from "../../domain/errors/AppError";
import { verifyPassword } from "../../libs/bcrypt";
import { jwtForLogIn } from "../../libs/jwt";

export const logIn = async (logInCredentials: { email: string; password: string | null }) => {
  const { email, password } = logInCredentials;
  const account = await accountRepo.findByEmail(email);
  if (!account) throw new AppError("No account with this email exist", 404);
  if (password) {
    await verifyPassword(password, account.password);
  }
  return jwtForLogIn(String(account._id));
};
