import { Socket, io } from 'socket.io-client';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/users/entities/user.entity';
import { mockChats, mockUsers, providers } from '../libs/utils/test-utils';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let jwtService: JwtService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let _ioClient: Socket;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'q8cV/rjS4oTS1Zeren9AT7RIGnkQvvCq9/a+1JL2/0g=',
        }),
      ],
      providers: [
        ChatGateway,
        providers.s3Service,
        providers.authService(jwtService),
        {
          provide: ChatService,
          useValue: {
            findAll: jest
              .fn<Promise<Chat[]>, []>()
              .mockImplementation(async () => mockChats),
            getUserFromSocket: jest
              .fn<Promise<User>, []>()
              .mockImplementation(async () => mockUsers[0]),
          },
        },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    jwtService = module.get<JwtService>(JwtService);
    _ioClient = io('http://localhost:8090', {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
