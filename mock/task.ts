import { Request, Response } from 'express';
import { parse } from 'url';
import { schedulerListDataSource } from './scheduler';

function generateRadomStatus() {
  const status = ['Finished', 'Running', 'Failed'];
  return status[Math.floor(Math.random() * status.length)];
}

function calculatRuningTimes(beginTimestamp: string) {
  const beginTime = new Date(beginTimestamp).getTime();
  const currentTime = new Date().getTime();
  return (currentTime - beginTime) / (1000 * 60 * 60);
}

function generateExecutionTime(beginTimestamp: string, interval: number) {
  const beginTime = new Date(beginTimestamp).getTime();
  const currentTime = beginTime + interval * (1000 * 60 * 60);
  return new Date(currentTime).toLocaleString();
}

function generateTask() {
  const jobs: API.Task[] = [];
  let jobId = 1;
  for (let i = 0; i < schedulerListDataSource.length; i++) {
    const scheduler = schedulerListDataSource[i];
    const beginTimestamp = '03/14/2024 12:00:00';
    if (scheduler.type === 'Once') {
      const job: API.Task = {
        id: jobId++,
        name: 'Job' + (jobId - 1),
        type: scheduler.type,
        schedulerName: scheduler.name,
        scheduler: scheduler,
        status: 'Finished',
        scheduledExecutionTime: new Date(beginTimestamp).toLocaleString(),
        actualExecutionTime: new Date(beginTimestamp).toLocaleString(),
      };
      jobs.push(job);
    } else {
      for (let j = 0; j < calculatRuningTimes(beginTimestamp); j++) {
        const executionTime = generateExecutionTime(beginTimestamp, j);
        const job: API.Task = {
          id: jobId++,
          name: 'Job' + (jobId - 1),
          type: scheduler.type,
          schedulerName: scheduler.name,
          scheduler: scheduler,
          status: generateRadomStatus(),
          scheduledExecutionTime: executionTime,
          actualExecutionTime: executionTime,
        };
        jobs.push(job);
      }
    }
  }
  return jobs;
}

export let taskListDataSource: API.Task[] = generateTask();

function getTask(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.Task & {
      sorter: any;
      filter: any;
    };

  let dataSource = taskListDataSource;

  if (params.name) {
    dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
  }

  dataSource = dataSource.slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  const result = {
    data: dataSource,
    total: taskListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

export default {
  'GET /api/task': getTask,
};
