"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appEvent = exports.otpRepo = exports.accountRepo = void 0;
// Singletons
const applicationEvents_1 = require("../../@global/events/applicationEvents");
const otpSchema_1 = require("../../infrastructure/database/schemas/otpSchema");
const userAccountSchema_1 = require("../../infrastructure/database/schemas/userAccountSchema");
const accountRepository_1 = require("../../infrastructure/repository/accountRepository");
const otpRepository_1 = require("../../infrastructure/repository/otpRepository");
exports.accountRepo = new accountRepository_1.AccountRepository(userAccountSchema_1.AccountDb);
exports.otpRepo = new otpRepository_1.OtpRepository(otpSchema_1.OtpDb);
exports.appEvent = new applicationEvents_1.AppEvents();
