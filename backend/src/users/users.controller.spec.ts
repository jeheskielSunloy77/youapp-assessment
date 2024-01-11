import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { mockUsers } from '../libs/utils/test-utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('User Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest
              .fn<Promise<User[]>, []>()
              .mockImplementation(async () => mockUsers),
            findById: jest
              .fn<Promise<User>, [string]>()
              .mockImplementation(async (id) => {
                const user = mockUsers.find((u) => u.id === id) || mockUsers[0];
                if (!user) throw new Error('User not found');

                return user;
              }),
            findOne: jest
              .fn<Promise<User>, [{ name: string }]>()
              .mockImplementation(async ({ name }) => {
                const user =
                  mockUsers.find((user) => user.name === name) || mockUsers[0];
                if (!user) throw new Error('User not found');

                return user;
              }),
            create: jest
              .fn<Promise<CreateUserDto>, [CreateUserDto]>()
              .mockImplementation(async (user) => ({
                _id: 'a new user id',
                ...user,
              })),
            update: jest
              .fn<Promise<User>, [string, UpdateUserDto]>()
              .mockImplementation(async (id, updateUserDto) => {
                const user = mockUsers.find((user) => user.id === id);
                if (!user) throw new Error('User not found');

                return Promise.resolve({
                  ...user,
                  name: updateUserDto.name,
                });
              }),
            remove: jest
              .fn<Promise<CreateUserDto>, [string]>()
              .mockImplementation(async (id) => {
                const user = mockUsers.find((user) => user.id === id);
                if (!user) throw new Error('User not found');
                return user;
              }),
          },
        },
      ],
    }).compile();

    controller = module.get(UsersController);
    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find all', () => {
    it('should get an array of users', async () => {
      expect(await controller.findAll()).toEqual(mockUsers);
    });
  });
  describe('find one', () => {
    it('should get a single user', () => {
      expect(controller.findOne(mockUsers[0].id)).resolves.toEqual(
        mockUsers[0],
      );
    });
  });
  describe('find one by name', () => {
    it('should get a user back', async () => {
      await expect(controller.findOneByName(mockUsers[0].id)).resolves.toEqual(
        mockUsers[0],
      );

      const aquaMock = createMock<User>({
        name: 'Aqua',
        email: 'Maine Coon',
        password: 'Password123',
      });
      const getByNameSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValueOnce(aquaMock as any);
      const getResponse = await controller.findOneByName('Aqua');
      expect(getResponse).toEqual(aquaMock);
      expect(getByNameSpy).toHaveBeenCalledWith(aquaMock);
    });
  });
  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        name: 'test3',
        email: 'test3@gmail.com',
        password: 'Password123!',
        passwordConf: 'Password123!',
      };
      expect(controller.create(createUserDto)).resolves.toEqual({
        _id: 'a new user id',
        ...createUserDto,
      });
    });
  });
  describe('update', () => {
    it('should update a new user', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'not test1',
        userId: mockUsers[0].id,
      };

      expect(
        controller.update(mockUsers[0].id, updateUserDto),
      ).resolves.toEqual({
        ...mockUsers[0],
        name: updateUserDto.name,
      });
    });
  });
  describe('delete', () => {
    it('should return that it deleted a user', () => {
      expect(controller.remove(mockUsers[0].id)).resolves.toEqual(mockUsers[0]);
    });
    it('should return that it did not delete a user', () => {
      const deleteSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({} as any);
      expect(controller.remove('a uuid that does not exist')).resolves.toEqual(
        {},
      );
      expect(deleteSpy).toHaveBeenCalledWith('a uuid that does not exist');
    });
  });
});
