import { sendEmail } from "../../libs/nodeMailer";

export interface LoginOtpEmailI {
  expiryTime: string;
  otpCode: number;
  username: string;
  email: string;
}

export const sendLogInEmail = async (data: LoginOtpEmailI) => {
    const {email,expiryTime,otpCode,username}=data
    await sendEmail(email, "FTI-Nexus Account Login Attempt", "login-otp-email", { expiryTime, otpCode, username });
};
