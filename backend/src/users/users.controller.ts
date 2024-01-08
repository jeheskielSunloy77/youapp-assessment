import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

const avatarFilePipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
    new FileTypeValidator({
      fileType: /image\/(jpg|png|jpeg|webp)/,
    }),
  ],
});

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @UploadedFile(avatarFilePipe)
    avatar?: Express.Multer.File,
  ) {
    return this.usersService.create(createUserDto, avatar);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(avatarFilePipe) avatar?: Express.Multer.File,
  ) {
    return this.usersService.update(id, updateUserDto, avatar);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.login(loginUserDto);
    if (!user) throw new BadRequestException('Invalid credentials');
    return user;
  }

  // need to be deleted on production
  @Delete()
  async wipe() {
    const users = await this.usersService.findAll();

    for (const user of users) {
      await this.usersService.remove(user.id);
    }
    return { message: 'All users deleted' };
  }
}
