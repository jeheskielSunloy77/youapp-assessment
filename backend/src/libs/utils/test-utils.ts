import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from '../../auth/auth.service';
import { ChatDto } from '../../chat/dto/chat.dto';
import { S3Service } from '../../s3/s3.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export const mockUsers = [
  {
    id: 'userid1',
    name: 'test1',
    email: 'test1@gmail.com',
    password: 'Password123!',
    passwordConf: 'Password123!',
  },
  {
    id: 'userid2',
    name: 'test2',
    email: 'test2@gmail.com',
    password: 'Password123!',
    passwordConf: 'Password123!',
  },
];

export const mockChats = [
  {
    id: 'chatid1',
    message: 'this is test message 1',
    userId: 'userid1',
    user: mockUsers[0],
  },
  {
    id: 'chatid2',
    message: 'this is test message 2',
    userId: 'userid2',
    user: mockUsers[1],
  },
];

function getAuthServiceValue(jwtService: JwtService) {
  return {
    provide: AuthService,
    useValue: {
      logIn: jest
        .fn<Promise<{ accessToken: string }>, [string, string]>()
        .mockImplementation(async (credential, password) => {
          const user = mockUsers.find(
            (user) =>
              (user.email === credential || user.name === credential) &&
              user.password === password,
          );

          if (!user) throw new Error('Invalid credentials');

          return { accessToken: await jwtService.signAsync(user) };
        }),
      register: jest
        .fn<Promise<{ accessToken: string }>, [CreateUserDto]>()
        .mockImplementation(async (createUserDto) => ({
          accessToken: await jwtService.signAsync(createUserDto),
        })),
      revalidateToken: jest
        .fn<Promise<string>, [string]>()
        .mockImplementation(async (token) =>
          jwtService.sign(await jwtService.verifyAsync(token)),
        ),
      getUserFromToken: jest.fn().mockResolvedValue(mockUsers[0]),
    },
  };
}

export const providers = {
  s3Service: {
    provide: S3Service,
    useValue: { upload: jest.fn(), delete: jest.fn() },
  },
  userModel: {
    provide: getModelToken('User'),
    useValue: {
      new: jest.fn().mockResolvedValue(mockChats[0]),
      constructor: jest.fn().mockResolvedValue(mockChats[0]),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      findById: jest.fn(),
      exec: jest.fn(),
      create: jest
        .fn<Promise<CreateUserDto>, [CreateUserDto]>()
        .mockImplementation(async (user) => {
          return {
            _id: 'a new user id',
            ...user,
            password: user.passwordConf,
          };
        }),
    },
  },
  chatModel: {
    provide: getModelToken('Chat'),
    useValue: {
      new: jest.fn().mockResolvedValue(mockChats[0]),
      constructor: jest.fn().mockResolvedValue(mockChats[0]),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      findById: jest.fn(),
      exec: jest.fn(),
      pupulate: jest.fn(),
      create: jest
        .fn<Promise<ChatDto>, [ChatDto]>()
        .mockImplementation(async (chat) => {
          return {
            _id: 'a new chat id',
            ...chat,
          };
        }),
    },
  },
  authService: getAuthServiceValue,
};
