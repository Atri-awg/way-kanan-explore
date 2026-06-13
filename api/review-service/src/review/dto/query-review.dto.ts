import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class QueryReviewDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  destinationId?: string;
}
