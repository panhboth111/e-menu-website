import { IsEmail, IsString, ValidateIf } from 'class-validator';

export class UpdateProfileDto {
  @IsEmail()
  email: string;
  @IsString()
  fullname: string;
}
