import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetFoodsDto {
  @IsArray()  
  ids: number[];


}
