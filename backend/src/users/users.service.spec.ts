import { createMock } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { mockUsers, providers } from '../libs/utils/test-utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<UserDocument>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, providers.userModel, providers.s3Service],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<UserDocument>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all users', () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUsers),
    } as unknown as Query<UserDocument[], UserDocument>);
    expect(service.findAll()).resolves.toEqual(mockUsers);
  });

  it('should find one user by id', () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce(
      createMock<Query<UserDocument, UserDocument>>({
        exec: jest.fn().mockResolvedValueOnce(mockUsers[0]),
      }),
    );
    expect(service.findOne(mockUsers[0].id)).resolves.toEqual(mockUsers[0]);
  });

  it('should find one user by any property', () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<UserDocument, UserDocument>>({
        exec: jest.fn().mockResolvedValueOnce(mockUsers[1]),
      }),
    );
    expect(service.findOne({ name: mockUsers[1].name })).resolves.toEqual(
      mockUsers[1],
    );
  });

  it('should create a new user', () => {
    const createUserDto: CreateUserDto = {
      name: 'Oliver',
      email: 'oliver@gmail.com',
      password: 'Password123!',
      passwordConf: 'Password123!',
    };

    expect(service.create(createUserDto)).resolves.toEqual({
      ...createUserDto,
      _id: 'a new user id',
    });
  });

  it('should update a user successfully', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce({
      id: 'some id',
      name: 'Garfield',
    });
    const updatedUser: any = await service.update('some id', {
      name: 'Garfield',
      userId: 'some id',
    });

    expect(updatedUser.message).toBeUndefined();
    expect(updatedUser.name).toEqual('Garfield');
  });

  it('should delete a user successfully', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(mockUsers[1]);
    expect(await service.remove(mockUsers[1].id)).toEqual(mockUsers[1]);
  });

  it('should not delete a user if return error', async () => {
    jest
      .spyOn(model, 'findByIdAndDelete')
      .mockResolvedValueOnce(new Error('bad delete!'));
    expect(await service.remove(mockUsers[1].id)).toBeDefined();
  });
});
