import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(credential: string, password: string) {
    const user = await this.usersService.findOne({
      $or: [{ name: credential }, { email: credential }],
    });
    if (!user) throw new UnauthorizedException();

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) throw new UnauthorizedException();

    return {
      accessToken: await this.jwtService.signAsync(user.toObject()),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return {
      accessToken: await this.jwtService.signAsync(user.toObject()),
    };
  }

  async getUserFromToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    if (payload._id) return this.usersService.findOne(payload._id);
  }
}
