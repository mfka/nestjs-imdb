import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export enum PaginationDefault {
  LIMIT = 10,
  PAGE = 1,
}

export class PaginationOptionsDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @ApiProperty({ type: Number, required: false })
  @Transform(limit => +limit)
  limit: number = PaginationDefault.LIMIT;

  @IsNumber()
  @IsOptional()
  @Min(PaginationDefault.PAGE)
  @Transform(page => +page)
  @ApiProperty({ type: Number, required: false })
  page: number = PaginationDefault.PAGE;
}
