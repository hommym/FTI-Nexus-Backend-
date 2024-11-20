"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRepo = void 0;
// Singletons
const userAccountSchema_1 = require("../../infrastructure/database/schemas/userAccountSchema");
const accountRepository_1 = require("../../infrastructure/repository/accountRepository");
exports.accountRepo = new accountRepository_1.AccountRepository(userAccountSchema_1.AccountDb);
