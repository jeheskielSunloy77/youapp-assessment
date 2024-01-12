import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender, Genders, Horoscopes, Zodiac, Zodiacs } from '../../libs/types';

@Schema({ timestamps: true })
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

  @Prop({
    unique: true,
    sparse: true,
    match: new RegExp(
      `^https:\/\/[a-zA-Z0-9-]+\.s3\.[a-zA-Z0-9-]+\.amazonaws\.com\/`,
    ),
  })
  avatarUrl?: string;

  @Prop({ type: Date, max: new Date() })
  birthday?: Date;

  @Prop({ min: 10, max: 300 })
  weight?: number;

  @Prop({ min: 40, max: 300 })
  height?: number;

  @Prop({ type: String, enum: Genders })
  gender?: Gender;

  @Prop({ type: String, enum: Zodiacs })
  zodiac?: Zodiac;

  @Prop({ type: String, enum: Horoscopes })
  horoscope?: string;

  @Prop({
    type: [{ type: String, minlength: 3, maxlength: 20 }],
  })
  interests?: string[];

  @Prop({ type: String, unique: true, select: false })
  sessionToken?: string;

  @Prop({ type: Date })
  sessionTokenExpiration?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
