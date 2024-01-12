import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { Request as RequestExpress } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SkipAuth } from './libs/skip-auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.logIn(loginDto.credential, loginDto.password);
  }

  @SkipAuth()
  @Post('register')
  @UseInterceptors(NoFilesInterceptor())
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @SkipAuth()
  @Patch('revalidateToken')
  async revalidateToken(
    @Request()
    req: RequestExpress,
  ) {
    const token = this.extractTokenFromHeader(req);
    if (!token) throw new UnauthorizedException();

    const accessToken = await this.authService.revalidateToken(token);
    if (!accessToken) throw new UnauthorizedException();
    return { accessToken };
  }

  private extractTokenFromHeader(request: RequestExpress): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
