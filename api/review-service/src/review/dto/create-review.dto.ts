import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  destinationId!: string;

  @IsString()
  reviewerName!: string;

  @IsString()
  comment!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;
}
