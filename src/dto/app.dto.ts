import { IsNotEmpty } from 'class-validator';

export class AppDto {
  @IsNotEmpty()
  cnpj: string;
}
