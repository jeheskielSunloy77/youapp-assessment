import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  credential: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
