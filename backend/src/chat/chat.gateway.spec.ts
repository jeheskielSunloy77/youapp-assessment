import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Socket, io } from 'socket.io-client';
import { ChatGateway } from './chat.gateway';

async function createNestApp(...gateways: any): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();
  return testingModule.createNestApplication();
}

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let app: INestApplication;
  let ioClient: Socket;

  beforeAll(async () => {
    app = await createNestApp(ChatGateway);
    gateway = app.get<ChatGateway>(ChatGateway);
    ioClient = io('http://localhost:8090', {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });

    app.listen(8090);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should emit "pong" on "ping"', async () => {
    ioClient.connect();
    ioClient.emit('ping', 'Hello world!');
    await new Promise<void>((resolve) => {
      ioClient.on('connect', () => {
        console.log('connected');
      });
      ioClient.on('pong', (data) => {
        expect(data).toBe('Hello world!');
        resolve();
      });
    });
    ioClient.disconnect();
  });
});
