import { User } from 'src/users/entities/user.entity';

export class Chat {
  id: string;
  message: string;
  user: User;
}
