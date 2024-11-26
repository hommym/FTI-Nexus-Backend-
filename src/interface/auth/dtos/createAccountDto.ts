import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class CreateAccountDto {
  @IsString()
  @IsIn(["trader", "investor"])
  accountType: "trader" | "investor";

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;  // make sure password is at leat 8 characters long has at least 1 lower,upper ,number and special character.

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  countryOfOrigin: string;

  @IsOptional()
  @IsUrl()  
  profile?: string;
}
