import { Response} from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../services/taskService";
import {Request} from '../types/request'

// Create new task
export const createNewTask =
  async (req: Request, res: Response) => {
    try {
      const { title, description, imageUrl, category, priority,dueDate } = req.body;
      const task = await createTask(title, description, imageUrl, category, priority,dueDate, req.userId!);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
;

// Update existing task
export const updateExistingTask =
  async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const { title, description, imageUrl, category, priority,dueDate } = req.body;
      const task = await updateTask(Number(taskId), title, description, imageUrl, category, priority,dueDate);
      res.status(200).json(task);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
;

export const getUserTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getTasks(req.userId!);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteExistingTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    await deleteTask(Number(taskId));
    res.status(202).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
