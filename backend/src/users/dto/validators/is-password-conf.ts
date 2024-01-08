import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsPasswordConf(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordConf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['password'],
      options: validationOptions,
      validator: {
        validate(passwordConf: unknown, args: ValidationArguments) {
          const password = args.object['password'];

          if (typeof passwordConf !== 'string' && typeof password !== 'string')
            return false;

          return passwordConf === password;
        },
        defaultMessage: () => 'Password confirmation does not match',
      },
    });
  };
}
