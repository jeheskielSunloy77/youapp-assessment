import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createHash, randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  private genSalt() {
    const lenght = Math.random() * (26 - 20) + 20;
    const salt = randomBytes(Math.ceil(lenght / 2))
      .toString('base64')
      .slice(0, lenght);

    return salt;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);

    newUser.passwordSalt = this.genSalt();

    newUser.password = createHash('sha256')
      .update(newUser.password + newUser.passwordSalt)
      .digest('hex');

    return await newUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(params: string | Parameters<typeof this.userModel.findOne>[0]) {
    if (typeof params === 'string')
      return await this.userModel.findById(params).exec();

    return await this.userModel.findOne().exec();
  }

  async exists(params: Parameters<typeof this.userModel.exists>[0]) {
    return await this.userModel.exists(params);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({
      $or: [
        { email: loginUserDto.credential },
        { name: loginUserDto.credential },
      ],
    });
    if (!user) return;

    const password = createHash('sha256')
      .update(loginUserDto.password + user.passwordSalt)
      .digest('hex');

    if (password === user.password) return user;
  }
}
