import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

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

export class SendMultipleDTO {
  @IsArray()
  @IsNotEmpty()
  token: string[];

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class SendTopicsDTO {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class SubscribeTopicDTO {
  @IsArray()
  @IsNotEmpty()
  tokens: string[];

  @IsString()
  @IsNotEmpty()
  topic: string;
}
