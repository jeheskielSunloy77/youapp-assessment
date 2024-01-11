import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockUsers, providers } from '../libs/utils/test-utils';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'q8cV/rjS4oTS1Zeren9AT7RIGnkQvvCq9/a+1JL2/0g=',
        }),
      ],
      providers: [providers.authService(jwtService)],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return access token when logged in successfuly', async () => {
    const user = mockUsers[0];

    expect(service.logIn(user.name, user.password)).resolves.toEqual({
      accessToken: await jwtService.signAsync(user),
    });
  });

  it('should return access token when registered successfuly', async () => {
    const createUserDto: CreateUserDto = {
      name: 'test3',
      email: 'test3@gmail.com',
      password: 'Password123!',
      passwordConf: 'Password123!',
    };
    expect(service.register(createUserDto)).resolves.toEqual({
      accessToken: await jwtService.signAsync(createUserDto),
    });
  });
});
