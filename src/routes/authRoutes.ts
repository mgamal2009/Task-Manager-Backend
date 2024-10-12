import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import {validateDto} from "../middleware/validationMiddleware";
import {RegisterDto} from "../dto/registerDto";
import {LoginDto} from "../dto/loginDto";

const router = Router();

router.post("/register",validateDto(RegisterDto), registerUser);
router.post("/login", validateDto(LoginDto), loginUser);

export default router;
