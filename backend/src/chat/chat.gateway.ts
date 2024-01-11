import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@WebSocketGateway({ cors: true })
@UsePipes(
  new ValidationPipe({ exceptionFactory: (err) => new WsException(err) }),
)
export class ChatGateway {
  constructor(private chatService: ChatService) {}
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    const user = await this.checkUser(socket);
    this.logger.log(`User ${user.id} is connected to websocket!`);
  }

  async handleDisconnect(socket: Socket) {
    const user = await this.checkUser(socket);
    this.logger.log(`User ${user.id} is disconnected from websocket!`);
  }

  @SubscribeMessage('sendMessage')
  async listenForMessages(
    @MessageBody() chatDto: ChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const user = await this.checkUser(socket);

    const chat = await this.chatService.create(chatDto, user);
    this.server.sockets.emit('receiveMessage', chat);
  }

  @SubscribeMessage('getAllMessages')
  async getAllMessages(@ConnectedSocket() socket: Socket) {
    await this.checkUser(socket);

    const chats = await this.chatService.findAll();
    this.server.sockets.emit('receiveAllMessages', chats);
  }

  @SubscribeMessage('deleteMessage')
  async deleteMessage(
    @MessageBody() id: string,
    @ConnectedSocket() socket: Socket,
  ) {
    await this.checkUser(socket);

    const chat = await this.chatService.remove(id);
    this.server.sockets.emit('receiveDeleteMessage', chat);
  }

  @SubscribeMessage('ping')
  async ping() {
    this.server.sockets.emit('pong', 'Hello world! from websocket');
  }

  private async checkUser(socket: Socket) {
    const user = await this.chatService.getUserFromSocket(socket);
    if (!user) throw new WsException('Invalid credentials.');
    return user;
  }
}
