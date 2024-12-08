"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRegistrationEmail = void 0;
const nodeMailer_1 = require("../../libs/nodeMailer");
const sendRegistrationEmail = async (data) => {
    const { otpCode, username, email } = data;
    await (0, nodeMailer_1.sendEmail)(email, "Welcome To FTI-Nexus", "registration-otp-email", { username, otpCode });
};
exports.sendRegistrationEmail = sendRegistrationEmail;
