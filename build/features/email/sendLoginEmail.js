"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLogInEmail = void 0;
const nodeMailer_1 = require("../../libs/nodeMailer");
const sendLogInEmail = async (data) => {
    const { email, expiryTime, otpCode, username } = data;
    await (0, nodeMailer_1.sendEmail)(email, "FTI-Nexus Account Login Attempt", "login-otp-email", { expiryTime, otpCode, username });
};
exports.sendLogInEmail = sendLogInEmail;
