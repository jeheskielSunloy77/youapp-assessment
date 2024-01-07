import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender, Horoscopes, Zodiac, Zodiacs } from 'src/libs/types';

@Schema()
export class User {
  @Prop({ unique: true, minlength: 3, required: true })
  name: string;

  @Prop({ type: Date, max: new Date(), required: true })
  birthday: Date;

  @Prop({ min: 20, max: 300, required: true })
  weight: number;

  @Prop({ min: 90, max: 300, required: true })
  height: number;

  @Prop({ type: String, enum: ['Male', 'Female'], required: true })
  gender: Gender;

  @Prop({ type: String, enum: Zodiacs, required: true })
  zodiac: Zodiac;

  @Prop({ type: String, enum: Horoscopes, required: true })
  horoscope: string;

  @Prop({
    type: [String],
    validate: [
      {
        validator: (arr: string[]) => arr.length > 0,
        message: 'At least one interest is required',
      },
      {
        validator: (arr: string[]) => arr.length === new Set(arr).size,
        message: 'All interests must be unique',
      },
    ],
    required: true,
  })
  interests: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
