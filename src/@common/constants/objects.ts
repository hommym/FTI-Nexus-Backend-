// Singletons
import { OtpDb } from "../../infrastructure/database/schemas/otpSchema";
import { AccountDb } from "../../infrastructure/database/schemas/userAccountSchema";
import { AccountRepository } from "../../infrastructure/repository/accountRepository";
import { OtpRepository } from "../../infrastructure/repository/otpRepository";



export const accountRepo = new AccountRepository(AccountDb);
export const otpRepo= new OtpRepository(OtpDb)

