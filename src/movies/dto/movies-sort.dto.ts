import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortOrder } from '../../common/sorting/oder.enum';
import { SortField } from '../sort-fields.enum';

export class MoviesSortDto {
  @IsEnum(SortField)
  @ApiProperty({
    enum: Object.values(SortField),
    required: false,
    default: SortField.ID,
  })
  public sortBy: SortField = SortField.ID;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SortOrder)
  @ApiProperty({
    enum: Object.values(SortOrder),
    required: false,
    default: SortOrder.DESC,
  })
  public sortOrder: SortOrder = SortOrder.DESC;
}
