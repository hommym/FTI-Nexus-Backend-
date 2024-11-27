import { Router, Request, Response } from "express";
import { checkUsernameValidityController, googleOAuthController, loginController, loginOAuthController, signupController, signupOAuthController } from "./authControllers";
import { requestBodyValidator } from "../middlewares/bodyValidator";
import { CreateAccountDto } from "./dtos/createAccountDto";
import { LoginDto } from "./dtos/loginDto";
import { requestParamsValidator } from "../middlewares/paramsValidator";

export const authRouter = Router();

authRouter.post("/signup", requestBodyValidator(CreateAccountDto),signupController);

authRouter.post("/login",requestBodyValidator(LoginDto) ,loginController);

authRouter.get("/username/is-valid/:username", requestParamsValidator([{ paramsName: "username", requiredDataType: "string" }]), checkUsernameValidityController);

// url for redirecting to third party auth page during signup
authRouter.get("/signup/:oAuthType", signupOAuthController);

// url for redirecting to third party auth page during login
authRouter.get("/login/:oAuthType", loginOAuthController);

// callback url for google after recieving consent from the user.
authRouter.get("/google-signup", googleOAuthController);
