import {CatEnum, PriorityEnum, Task} from "../entities/taskEntity";
import {AppDataSource} from "../database/dataSource";
import {DeepPartial} from "typeorm";

const taskRepository = AppDataSource.getRepository(Task);


export const createTask = async (title: string, description: string, imageUrl:string, category:string, priority:string,dueDate:string, userId: number) => {
  const task = taskRepository.create({title,description,imageUrl,category,priority,dueDate, user: {id: userId}} as DeepPartial<Task>);
  return await taskRepository.save(task);
};

export const getTasks = async (userId: number) => {
  return await taskRepository.find({ where: { user: { id: userId } } });
};

export const updateTask = async (taskId: number, title: string, description: string, imageUrl:string, category:string, priority:string,dueDate:string) => {
  const task = await taskRepository.findOneBy({ id: taskId });
  if (!task) throw new Error("Task not found");

  const categoryEnum = CatEnum[category.toUpperCase() as keyof typeof CatEnum];
  const priorityEnum = PriorityEnum[priority.toUpperCase() as keyof typeof PriorityEnum];


  if (!categoryEnum || !priorityEnum) {
    throw new Error("Invalid category or priority");
  }
  task.title = title;
  task.description = description;
  task.imageUrl = imageUrl;
  task.category = categoryEnum;
  task.priority = priorityEnum;
  task.dueDate = new Date(dueDate);

  return await task.save();
};

export const deleteTask = async (taskId: number) => {
  const task = await taskRepository.findOneBy({ id: taskId });
  if (!task) throw new Error("Task not found");

  await taskRepository.remove(task);
};
