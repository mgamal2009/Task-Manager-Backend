import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, ManyToOne, BaseEntity,
} from "typeorm";
import {User} from "./userEntity";
export enum CatEnum {
  UI_UX = 'ui_ux',
  BACKEND = 'backend',
  FRONTEND = 'frontend',
  DEVOPS = 'devops',
}
export enum PriorityEnum {
  HIGH = 'high',
  MID = 'mid',
  LOW = 'low',
}

@Entity()
export class Task extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  category: CatEnum;

  @Column()
  priority: PriorityEnum;

  @Column()
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}