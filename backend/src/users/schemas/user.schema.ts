import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender, Genders, Horoscopes, Zodiac, Zodiacs } from 'src/libs/types';

@Schema()
export class User {
  @Prop({ unique: true, minlength: 3, required: true })
  name: string;

  @Prop({
    unique: true,
    minlength: 3,
    required: true,
    match: /\S+@\S+\.\S+/,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, minlength: 6 })
  passwordSalt: string;

  @Prop({
    unique: true,
    match: new RegExp(
      `^https:\/\/[a-zA-Z0-9-]+\.s3\.[a-zA-Z0-9-]+\.amazonaws\.com\/`,
    ),
  })
  avatarUrl: string;

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

  @Prop({
    type: [{ type: String, minlength: 3, maxlength: 20 }],
  })
  interests: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
