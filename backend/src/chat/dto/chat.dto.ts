import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChatDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const base64String = value.split(';base64,').pop();
      if (base64String) return Buffer.from(base64String, 'base64');
    }
    return value;
  })
  attachment?: Buffer;
}
