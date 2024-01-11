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
  Request,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

const avatarFilePipe = new ParseFilePipe({
  fileIsRequired: false,
  exceptionFactory: (error) =>
    new BadRequestException({
      statusCode: 400,
      message: { avatar: error },
      error: 'Bad Request',
    }),
  validators: [
    new MaxFileSizeValidator({
      maxSize: 1024 * 1024 * 3,
      message: 'File size must be less than 3MB',
    }),
    new FileTypeValidator({ fileType: /image\/(jpg|png|jpeg|webp)/ }),
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
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: any,
    @Request() req,
    @UploadedFile(avatarFilePipe) avatar?: Express.Multer.File,
  ) {
    updateUserDto.userId = req.user._id;

    const errors = await validate(plainToClass(UpdateUserDto, updateUserDto));
    if (errors.length) {
      throw new BadRequestException(
        errors.map((err) => ({
          property: err.property,
          message: err.constraints[Object.keys(err.constraints)[0]],
        })),
      );
    }

    return this.usersService.update(id, updateUserDto, avatar);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
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
