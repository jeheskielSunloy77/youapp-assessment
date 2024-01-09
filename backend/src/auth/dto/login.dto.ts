import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  credential: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
