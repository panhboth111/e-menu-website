import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsArray()
  @IsNotEmpty()
  foods: [number];

  // @IsString()
  // @IsNotEmpty()
  // table: string;
}
