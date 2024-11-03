import crypto from 'crypto';
import nodemailer from 'nodemailer';
import ResetToken from '../../domain/resetToken.model';
import User from '../../domain/user.model'; 
import { IUser } from '../../domain/user.model';

interface ResetPasswordRequest {
  email: string;
}

interface ResetPasswordTokenRequest {
  token: string;
  newPassword: string;
}

// Generate reset token and send email
export const requestPasswordReset = async ({ email }: ResetPasswordRequest): Promise<string> => {
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  // Create reset token
  const token = crypto.randomBytes(32).toString('hex');
  const resetToken = new ResetToken({
    userId: user._id,
    token,
  });

  await resetToken.save();

  // Send email (using Nodemailer)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
    },
  });

  const mailOptions = {
    to: user.email,
    from: 'no-reply@yourapp.com',
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n
    http://yourapp.com/reset/${token}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  await transporter.sendMail(mailOptions);
  return 'Password reset link sent to your email';
};

// Reset Password
export const resetPassword = async ({ token, newPassword }: ResetPasswordTokenRequest): Promise<string> => {
  const resetToken = await ResetToken.findOne({ token });

  if (!resetToken) {
    throw new Error('Invalid or expired reset token');
  }

  const user = await User.findById(resetToken.userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.password = newPassword;
  await user.save();

  // Remove token after successful reset
  await resetToken.deleteOne();

  return 'Password has been reset successfully';
};
