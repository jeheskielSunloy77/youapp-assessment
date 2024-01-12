import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/users/schemas/user.schema';
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

    const accessToken = await this.jwtService.signAsync(user.toObject());

    await user.updateOne({
      sessionToken: accessToken,
      sessionTokenExpiration: new Date(Date.now() + 1000 * 6000 * 60 * 24 * 30),
      refreshTokenExpiration: new Date(Date.now() + 1000 * 6000 * 3),
    });
    return {
      accessToken,
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

  async revalidateToken(token: string) {
    let payload: UserDocument & { exp: number };
    try {
      payload = await this.jwtService.verifyAsync(token, {
        ignoreExpiration: true,
      });
    } catch (error) {
      return;
    }

    if (!payload) return;

    const isExpired = Date.now() >= payload.exp * 1000;
    if (!isExpired) return token;

    const user = await this.usersService.findOne({
      _id: payload._id,
      sessionToken: token,
    });
    if (!user) return;

    if (user.sessionTokenExpiration < new Date()) {
      await user.updateOne({
        sessionToken: null,
        sessionTokenExpiration: null,
        refreshTokenExpiration: null,
      });
      return;
    }

    return this.jwtService.signAsync(user.toObject());
  }
}
