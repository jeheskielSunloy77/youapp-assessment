import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { mockUsers, providers } from '../libs/utils/test-utils';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'q8cV/rjS4oTS1Zeren9AT7RIGnkQvvCq9/a+1JL2/0g=',
        }),
      ],
      controllers: [AuthController],
      providers: [providers.authService(jwtService)],
    }).compile();

    controller = module.get(AuthController);
    service = module.get(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return access token when logged in successfuly', async () => {
    const user = mockUsers[0];

    expect(service.logIn(user.name, user.password)).resolves.toEqual({
      accessToken: await jwtService.signAsync(user),
    });

    const logInSpy = jest
      .spyOn(service, 'logIn')
      .mockResolvedValueOnce({ accessToken: 'test' });

    const logInResp = await controller.logIn({
      credential: 'Aqua',
      password: 'Password123!',
    });
    expect(logInResp).toEqual({ accessToken: 'test' });
    expect(logInSpy).toHaveBeenCalledWith('Aqua', 'Password123!');
  });

  it('should return access token when registered successfuly', async () => {
    const createUserDto: CreateUserDto = {
      name: 'test3',
      email: 'test3@gmail.com',
      password: 'Password123!',
      passwordConf: 'Password123!',
    };
    expect(controller.register(createUserDto)).resolves.toEqual({
      accessToken: await jwtService.signAsync(createUserDto),
    });
  });

  it('should return access token when revalidated token successfuly', async () => {
    const user = mockUsers[0];
    const token = await jwtService.signAsync(user);
    const request = {
      headers: { authorization: `Bearer ${token}` },
    } as Request;

    expect(controller.revalidateToken(request)).resolves.toEqual({
      accessToken: await jwtService.signAsync(user),
    });
  });
});
