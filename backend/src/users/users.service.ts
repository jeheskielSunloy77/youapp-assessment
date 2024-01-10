import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { S3Service } from 'src/s3/s3.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createUserDto: CreateUserDto, avatar?: Express.Multer.File) {
    const newUser = new this.userModel(createUserDto);

    newUser.password = await bcrypt.hash(newUser.password, 10);

    if (!avatar) return await newUser.save();

    const { error, url } = await this.s3Service.upload(
      avatar.buffer,
      `youapp-assessment/users/${newUser.id}/avatar`,
    );
    if (error) throw InternalServerErrorException;

    newUser.avatarUrl = url;
    return await newUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(params: string | Parameters<typeof this.userModel.findOne>[0]) {
    if (typeof params === 'string')
      return await this.userModel.findById(params).exec();

    return await this.userModel.findOne(params).exec();
  }

  async exists(params: Parameters<typeof this.userModel.exists>[0]) {
    return await this.userModel.exists(params);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    avatar?: Express.Multer.File,
  ) {
    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

    if (!avatar) {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
    }

    const { error, url } = await this.s3Service.upload(
      avatar.buffer,
      `youapp-assessment/users/${id}/avatar`,
    );
    if (error) return { message: 'Error when uploading avatar file!' };

    return await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserDto, avatarUrl: url },
      { new: true },
    );
  }

  async remove(id: string) {
    const error = await this.s3Service.delete(
      `youapp-assessment/users/${id}/avatar`,
    );
    if (error) throw InternalServerErrorException;

    return await this.userModel.findByIdAndDelete(id);
  }
}
