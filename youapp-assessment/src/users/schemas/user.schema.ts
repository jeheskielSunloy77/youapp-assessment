import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Gender, Genders, Horoscopes, Zodiac, Zodiacs } from 'src/libs/types';

@Schema()
export class User {
  @Prop({ unique: true, minlength: 3, required: true })
  name: string;

  @Prop({
    unique: true,
    minlength: 3,
    required: true,
    validate: {
      validator: (email: string) => /\S+@\S+\.\S+/.test(email),
      message: 'Invalid email',
    },
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, minlength: 6 })
  passwordSalt: string;

  @Prop({ type: Date, max: new Date() })
  birthday: Date;

  @Prop({ min: 10, max: 300 })
  weight: number;

  @Prop({ min: 40, max: 300 })
  height: number;

  @Prop({ type: String, enum: Genders })
  gender: Gender;

  @Prop({ type: String, enum: Zodiacs })
  zodiac: Zodiac;

  @Prop({ type: String, enum: Horoscopes })
  horoscope: string;

  @IsOptional()
  @Prop({
    type: [{ type: String, minlength: 3, maxlength: 20 }],
  })
  interests: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
