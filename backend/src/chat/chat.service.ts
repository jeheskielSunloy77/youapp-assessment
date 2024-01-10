import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WsException } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/user.schema';
import { ChatDocument } from './chat.schema';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly authService: AuthService,
    @InjectModel('Chat') private chatModel: Model<ChatDocument>,
  ) {}

  async getUserFromSocket(socket: Socket) {
    const accessToken = socket.handshake.headers.authorization?.split(' ')[1];
    if (!accessToken) throw new WsException('Invalid credentials.');

    const user = this.authService.getUserFromToken(accessToken);

    if (!user) throw new WsException('Invalid credentials.');

    return user;
  }

  async create(chatDto: ChatDto, user: User) {
    const newMessage = new this.chatModel({
      message: chatDto.message,
      user,
    });

    return await newMessage.save();
  }

  findAll() {
    return this.chatModel.find().populate('user').exec();
  }

  findOne(id: string) {
    return this.chatModel.findById(id);
  }

  remove(id: string) {
    return this.chatModel.findByIdAndDelete(id);
  }

  update(id: number, chatDto: ChatDto) {
    return this.chatModel.findByIdAndUpdate(id, chatDto);
  }
}
