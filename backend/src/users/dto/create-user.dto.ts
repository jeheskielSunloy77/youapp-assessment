import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Max,
  MaxDate,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Gender, Genders, Horoscopes, Zodiac, Zodiacs } from 'src/libs/types';
import { IsPasswordConf } from './validators/is-password-conf';
import { IsUnique } from './validators/is-unique';

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

  @ValidateIf(isTruthy)
  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date(), { message: 'Birthday must be in the past' })
  birthday: Date;

  @ValidateIf(isTruthy)
  @IsNumber()
  @Type(() => Number)
  @Min(10, { message: 'Weight must be at least 10kg' })
  @Max(300, { message: 'Weight must be at most 300kg' })
  weight: number;

  @ValidateIf(isTruthy)
  @IsNumber()
  @Type(() => Number)
  @Min(40, { message: 'Height must be at least 40cm' })
  @Max(300, { message: 'Height must be at most 300cm' })
  height: number;

  @ValidateIf(isTruthy)
  @IsEnum(Zodiacs)
  zodiac: Zodiac;

  @ValidateIf(isTruthy)
  @IsEnum(Horoscopes)
  horoscope: string;

  @ValidateIf(isTruthy)
  @IsEnum(Genders)
  gender: Gender;

  @ValidateIf(isTruthy)
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  interests: string[];
}

function isTruthy(_: unknown, value: unknown) {
  return value !== null && value !== undefined && value !== '';
}
