import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { S3Service } from '../s3/s3.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createUserDto: CreateUserDto, avatar?: Express.Multer.File) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userModel.create(createUserDto);

    if (!avatar) return newUser;

    const { error, url } = await this.s3Service.upload(
      avatar.buffer,
      `youapp-assessment/users/${newUser.id}/avatar`,
    );
    if (error) {
      await newUser.deleteOne();
      throw InternalServerErrorException;
    }

    return newUser.updateOne({ avatarUrl: url });
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
