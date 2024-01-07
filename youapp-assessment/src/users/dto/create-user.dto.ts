import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsString,
  Max,
  Min,
  MinDate,
  MinLength,
} from 'class-validator';
import { Gender, Genders, Horoscopes, Zodiac, Zodiacs } from 'src/libs/types';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsDate()
  @MinDate(new Date())
  birthday: Date;

  @IsInt()
  @Min(20)
  @Max(300)
  weight: number;

  @IsInt()
  @Min(90)
  @Max(300)
  height: number;

  @IsEnum(Zodiacs)
  zodiac: Zodiac;

  @IsEnum(Horoscopes)
  horoscope: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  interests: string[];

  @IsEnum(Genders)
  gender: Gender;
}
