import { DataSource } from "typeorm";
import * as path from "node:path";
import { User } from "../entities/userEntity";
import { Task } from "../entities/taskEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "../../database/myDB.sqlite"),
  entities: [User, Task],
  synchronize: true,
  logging: true,
});