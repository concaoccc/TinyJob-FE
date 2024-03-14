import { Request, Response } from 'express';

function getGetScheduler(req: Request, res: Response) {}
export default {
  'GET /api/scheduler': getGetScheduler,
};
