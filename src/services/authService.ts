import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {AppDataSource} from "../database/dataSource";
import {User} from "../entities/userEntity";

const JWT_SECRET = "your_jwt_secret";

const userRepository = AppDataSource.getRepository(User);

export const register = async (name: string, email: string, password: string) => {
  const found = await userRepository.findOneBy({ email });
  if (found) throw new Error("User already found");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepository.create({ name, email, password: hashedPassword });
  await userRepository.save(user);
  const { password: _, ...result } = user;
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "3h" });
  return {token, id: user.id, name: user.name}
};

export const login = async (email: string, password: string) => {
  const user = await userRepository.findOneBy({ email });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "3h" });
  return { token,  id: user.id, name: user.name };
};
