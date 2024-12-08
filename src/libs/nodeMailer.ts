import dotenv from "dotenv";
dotenv.config();
import nodeMailer from "nodemailer";
import { join } from "path";

const path = join(__dirname, "..", "..", "/features/email/templates");
const transporter = nodeMailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SmtpUserName,
    pass: process.env.SmtpSecret,
  },
});

export const sendEmail = async (emailAddress: string, subject: string, template: string, context: any) => {
  const nodemailerExpressHandlebars = await import("nodemailer-express-handlebars");
  transporter.use(
    "compile",
    nodemailerExpressHandlebars.default({
      viewEngine: {
        extname: ".hbs",
        layoutsDir: path,
      },
      viewPath: path,
      extName: ".hbs",
    })
  );
  // set companyName
  context.companyName = process.env.AppName;
  const mailObject = { from: process.env.AdminEmailAdress, to: emailAddress, subject, template, context };
  await transporter.sendMail(mailObject);
};
