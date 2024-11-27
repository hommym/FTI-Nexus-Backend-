import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../../domain/errors/AppError";
import { signUp } from "../../use-cases/auth/signUp";
import { googleSignUp } from "../../use-cases/auth/googleSignUp";
import { google } from "googleapis";
import { redirectToGoogleAuth } from "../../use-cases/auth/redirectToGoogleAuth";
import { logIn } from "../../use-cases/auth/login";
import { googleLogin } from "../../use-cases/auth/googleLogIn";
import { Account } from "../../domain/auth/userAccount";
import { checkUsername } from "../../use-cases/auth/checkUsernameValidity";

export const oauth2Client = new google.auth.OAuth2(process.env.CLIENTID, process.env.CLIENTSECRET, `${process.env.BaseUrl}/api/v1/auth/google-signup`);

export const signupController = asyncHandler(async (req: Request, res: Response) => {
  console.log("An account is been created..");
  const accountInfo: Account = req.body;
  await signUp(accountInfo);
  console.log("Account creation sucessfull");
  res.status(201).json({ message: "Account created sucessfully" });
});

export const checkUsernameValidityController = asyncHandler(async (req: Request, res: Response) => {
  checkUsername(req.params.username);
  res.status(200).end();
});

export const signupOAuthController = asyncHandler(async (req: Request, res: Response) => {
  const { oAuthType } = req.params;
  if (oAuthType === "google") redirectToGoogleAuth(res);
  else throw new AppError("oAuthTpe parameter must have values like google,facebook", 400);
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.status(200).json({ message: "Login sucessful", token: await logIn({ email, password }) });
});

export const loginOAuthController = asyncHandler(async (req: Request, res: Response) => {
  const { oAuthType } = req.params;
  if (oAuthType === "google") redirectToGoogleAuth(res, "login");
  else throw new AppError("oAuthTpe parameter must have values like google,facebook", 400);
});

export const googleOAuthController = asyncHandler(async (req: Request, res: Response) => {
  const { code, state, error } = req.query;
  if (error) throw new AppError(error as string, 400);

  console.log("A User is creating an account with google..");
  console.log(`AuthCode=${code}`);

  if (state === process.env.GoogleOAuthStateValueForSignup) {
    const accountInfo = await googleSignUp(code as string);
    //  suppose to redirect to a page to collect the remaining data place the data gotten in the redirected url
    // the json response is for the mean time
    res.status(200).json({ accountInfo });
  } else if (state === process.env.GoogleOAuthStateValueForLogin) {
    const jwtForLogIn = await googleLogin(code as string);
    // redirect to a page with the jwtToken injected into it we are returning the token in json for now

    res.status(200).json({ jwtForLogIn });
  } else {
    throw new AppError("Data has been tempered with", 400);
  }
});
