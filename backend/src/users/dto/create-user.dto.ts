import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Max,
  Min,
  MinDate,
  MinLength,
} from 'class-validator';
import { Gender, Genders, Horoscopes, Zodiac, Zodiacs } from 'src/libs/types';
import { IsPasswordConf } from './validators/is-password-conf';
import { IsUnique } from './validators/is-user-already';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @IsUnique('name')
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUnique('email')
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsPasswordConf()
  passwordConf: string;

  @IsOptional()
  @IsDate()
  @MinDate(new Date(), { message: 'Birthday must be in the past' })
  birthday: Date;

  @IsOptional()
  @IsInt()
  @Min(10, { message: 'Weight must be at least 10kg' })
  @Max(300, { message: 'Weight must be at most 300kg' })
  weight: number;

  @IsOptional()
  @IsInt()
  @Min(40, { message: 'Height must be at least 40cm' })
  @Max(300, { message: 'Height must be at most 300cm' })
  height: number;

  @IsOptional()
  @IsEnum(Zodiacs)
  zodiac: Zodiac;

  @IsOptional()
  @IsEnum(Horoscopes)
  horoscope: string;

  @IsOptional()
  @IsEnum(Genders)
  gender: Gender;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  interests: string[];
}
