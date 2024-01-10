import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IsUniqueConstraint } from './dto/validators/is-user-already';
import { UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, IsUniqueConstraint],
  exports: [UsersService],
})
export class UsersModule {}
