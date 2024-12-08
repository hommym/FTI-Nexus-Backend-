import { sendEmail } from "../../libs/nodeMailer";

export interface RegistrationOtpEmailI {
  otpCode: number;
  username: string;
  email: string;
}

export const sendRegistrationEmail = async (data: RegistrationOtpEmailI) => {
  const { otpCode, username, email } = data;
  await sendEmail(email, "Welcome To FTI-Nexus", "registration-otp-email", { username, otpCode });
};
