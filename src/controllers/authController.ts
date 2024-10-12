import {NextFunction, Response} from "express";
import {register, login} from "../services/authService";
import {Request} from '../types/request'


// Register user
export const registerUser =
  async (req: Request, res: Response) => {
    try {
      const {name, email, password} = req.body;
      const result = await register(name, email, password);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({message: error.message});
    }
  }
;

// Login user
export const loginUser =
  async (req: Request, res: Response) => {
    try {
      const {email, password} = req.body;
      const result = await login(email, password);
       res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({message: error.message});
    }
  }
;
