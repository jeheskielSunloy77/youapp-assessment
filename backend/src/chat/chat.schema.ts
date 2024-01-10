import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/user.schema';

export type ChatDocument = Chat & Document;

@Schema({
  toJSON: { getters: true, virtuals: true },
  timestamps: true,
})
export class Chat {
  @Prop({ required: true, unique: true })
  message: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
