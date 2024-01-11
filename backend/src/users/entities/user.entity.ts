import { Horoscope, Zodiac } from '../../libs/types';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  birthday?: Date;
  weight?: number;
  height?: number;
  interests?: string[];
  zodiac?: Zodiac;
  horoscope?: Horoscope;
}
