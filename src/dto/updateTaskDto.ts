import { IsString, Length } from "class-validator";
import {CatEnum, PriorityEnum} from "../entities/taskEntity";

export class UpdateTaskDto {
  @IsString()
  @Length(5, 100)
  title: string;

  @IsString()
  @Length(10, 500)
  description: string;

  @IsString()
  imageUrl: string;

  @IsString()
  category: CatEnum;

  @IsString()
  priority: PriorityEnum;

  @IsString()
  dueDate: Date;
}
