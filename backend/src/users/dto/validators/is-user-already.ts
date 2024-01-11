import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsersService } from 'src/users/users.service';

@Injectable()
@ValidatorConstraint({ name: 'isUserExist', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(value: any, args: ValidationArguments) {
    const fieldName = args.constraints[0];

    const existingUser = await this.userService.findOne({ [fieldName]: value });

    if (existingUser && existingUser.id === args.object['userId']) return true;
    return !existingUser;
  }

  defaultMessage(args: ValidationArguments) {
    const [fieldName] = args.constraints;
    return `User with this ${fieldName} already exists`;
  }
}

export function IsUnique(
  fieldName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [fieldName],
      validator: IsUniqueConstraint,
    });
  };
}
