import { IsNumberString, IsOptional } from 'class-validator';

export class QueryNotificationDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
