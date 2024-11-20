// Singletons
import { AccountDb } from "../../infrastructure/database/schemas/userAccountSchema";
import { AccountRepository } from "../../infrastructure/repository/accountRepository";



export const accountRepo = new AccountRepository(AccountDb);


