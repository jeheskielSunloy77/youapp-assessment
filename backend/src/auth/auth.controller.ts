import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
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
}
