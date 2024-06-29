import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SendNotifyDTO {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
