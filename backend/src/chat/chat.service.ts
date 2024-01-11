import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WsException } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { S3Service } from '../s3/s3.service';
import { User } from '../users/schemas/user.schema';
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
    if (!chatDto.attachment)
      return this.chatModel.create({ user, message: chatDto.message });

    const { url, error } = await this.s3Service.upload(
      chatDto.attachment,
      `${Date.now()}-${chatDto.message}`,
    );
    if (error) throw new WsException('Upload failed!');

    return this.chatModel.create({
      user,
      message: chatDto.message,
      attachmentUrl: url,
    });
  }

  findAll() {
    return this.chatModel.find().populate('user').exec();
  }

  findOne(id: string) {
    return this.chatModel.findById(id).exec();
  }

  remove(id: string) {
    return this.chatModel.findByIdAndDelete(id);
  }

  update(id: string, chatDto: ChatDto) {
    return this.chatModel.findByIdAndUpdate(id, chatDto);
  }
}
