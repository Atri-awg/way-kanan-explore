import { IsString, MaxLength } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsString()
  message!: string;
}
