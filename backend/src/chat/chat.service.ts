import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WsException } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { S3Service } from 'src/s3/s3.service';
import { User } from 'src/users/schemas/user.schema';
import { ChatDto } from './dto/chat.dto';
import { ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    private readonly authService: AuthService,
    private readonly s3Service: S3Service,
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
    const newChat = new this.chatModel({
      message: chatDto.message,
      user,
    });

    if (chatDto.attachment) {
      const { url, error } = await this.s3Service.upload(
        chatDto.attachment,
        `${Date.now()}-${chatDto.message}`,
      );
      if (error) throw new WsException('Upload failed!');
      newChat.attachmentUrl = url;
    }

    return await newChat.save();
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
