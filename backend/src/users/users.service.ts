import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  s3 = new S3Client({
    region: process.env.AWS_CREDENTIAL_REGION,
    credentials: {
      accessKeyId: process.env.AWS_CREDENTIAL_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_CREDENTIAL_SECRET_ACCESS_KEY as string,
    },
  });

  private async uploadFile(file: Express.Multer.File, Key: string) {
    if (!file.size) return { error: 'File is empty!' };

    try {
      const res = await this.s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_CREDENTIAL_S3_BUCKET,
          Key,
          Body: file.buffer,
        }),
      );
      if (res.$metadata.httpStatusCode !== 200)
        throw new Error('Upload failed!');

      return {
        url: `https://${process.env.AWS_CREDENTIAL_S3_BUCKET}.s3.${process.env.AWS_CREDENTIAL_REGION}.amazonaws.com/${Key}`,
      };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  private async deleteFile(Key: string) {
    try {
      const res = await this.s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_CREDENTIAL_S3_BUCKET,
          Key,
        }),
      );
      if (
        res.$metadata.httpStatusCode > 299 &&
        res.$metadata.httpStatusCode < 200
      )
        throw new Error('Delete failed!');
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  private genSalt() {
    const lenght = Math.random() * (26 - 20) + 20;
    const salt = randomBytes(Math.ceil(lenght / 2))
      .toString('base64')
      .slice(0, lenght);

    return salt;
  }

  async create(createUserDto: CreateUserDto, avatar?: Express.Multer.File) {
    const newUser = new this.userModel(createUserDto);

    newUser.passwordSalt = this.genSalt();
    newUser.password = createHash('sha256')
      .update(newUser.password + newUser.passwordSalt)
      .digest('hex');

    if (!avatar) return await newUser.save();

    const { error, url } = await this.uploadFile(
      avatar,
      `youapp-assessment/users/${newUser.id}/avatar`,
    );
    if (error) return { message: 'Error when uploading avatar file!' };

    newUser.avatarUrl = url;
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

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    avatar?: Express.Multer.File,
  ) {
    if (avatar) {
      const { error, url } = await this.uploadFile(
        avatar,
        `youapp-assessment/users/${id}/avatar`,
      );
      if (error) return { message: 'Error when uploading avatar file!' };

      return await this.userModel.findByIdAndUpdate(
        id,
        { ...updateUserDto, avatarUrl: url },
        { new: true },
      );
    }

    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const error = await this.deleteFile(`youapp-assessment/users/${id}/avatar`);
    if (error) throw InternalServerErrorException;

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
