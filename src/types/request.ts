import { Request as BaseRequest } from 'express';

export interface Request extends BaseRequest {
  userId?: number;  // Add custom userId property
}