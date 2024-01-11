import { createMock } from '@golevelup/ts-jest';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { mockChats, mockUsers, providers } from '../libs/utils/test-utils';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { ChatDocument } from './schemas/chat.schema';

describe('ChatService', () => {
  let service: ChatService;
  let model: Model<ChatDocument>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'q8cV/rjS4oTS1Zeren9AT7RIGnkQvvCq9/a+1JL2/0g=',
        }),
      ],
      providers: [
        ChatService,
        providers.chatModel,
        providers.userModel,
        providers.s3Service,
        providers.authService(jwtService),
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    jwtService = module.get<JwtService>(JwtService);
    model = module.get<Model<ChatDocument>>(getModelToken('Chat'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all chats', () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockChats),
      populate: jest.fn().mockReturnThis(),
    } as unknown as Query<ChatDocument[], ChatDocument>);
    expect(service.findAll()).resolves.toEqual(mockChats);
  });

  it('should find one chat by id', () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce(
      createMock<Query<ChatDocument, ChatDocument>>({
        exec: jest.fn().mockResolvedValueOnce(mockChats[0]),
      }),
    );
    expect(service.findOne(mockChats[0].id)).resolves.toEqual(mockChats[0]);
  });

  it('should create a new chat', () => {
    const chatDto: ChatDto = { message: 'test message' };

    expect(service.create(chatDto, mockUsers[0])).resolves.toEqual({
      ...chatDto,
      user: mockUsers[0],
      _id: 'a new chat id',
    });
  });

  it('should update a chat successfully', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce({
      id: 'some id',
      message: 'new message here!',
    });
    const updatedChat = await service.update('some id', {
      message: 'new message here!',
    });

    expect(updatedChat.message).toEqual('new message here!');
  });

  it('should delete a chat successfully', () => {
    jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(mockChats[1]);
    expect(service.remove(mockChats[1].id)).resolves.toEqual(mockChats[1]);
  });

  it('should not delete a chat if return error', () => {
    jest
      .spyOn(model, 'findByIdAndDelete')
      .mockResolvedValueOnce(new Error('bad delete!'));
    expect(service.remove(mockChats[1].id)).resolves.toBeDefined();
  });
});
