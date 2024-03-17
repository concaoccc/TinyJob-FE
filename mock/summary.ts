import { Request, Response } from 'express';
import { parse } from 'url';
import { packgeListDataSource, schedulerListDataSource, taskListDataSource } from './sourceData';

function getSummary(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.Package & {
      sorter: any;
      filter: any;
    };

  const result: API.Summary = {
    totalTask: taskListDataSource.length,
    totalPackage: packgeListDataSource.length,
    totalScheduler: schedulerListDataSource.length,
    success: true,
    taskSummary: [],
  };

  return res.json(result);
}

export default {
  'GET /api/summary': getSummary,
};
