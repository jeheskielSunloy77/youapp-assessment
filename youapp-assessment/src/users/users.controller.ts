import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.login(loginUserDto);
    if (!user) return { message: 'Invalid credentials' };
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

// {
// "name":"xxxxxxaaaaaaaaaaa",
// "weight":10,
// "height":183,
// "gender":"Male",
// "birthday":"12-12-2000",
// "interests":["hello","hello"],
// "zodiac":"Capricorn",
// "horoscope":"Dog"
// }
