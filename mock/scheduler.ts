import { Request, Response } from 'express';
import { parse } from 'url';
import { packgeListDataSource } from './package';

export let schedulerListDataSource: API.Scheduler[] = [
  {
    id: 1,
    name: 'HelloJobScheduler',
    type: 'Once',
    packageName: 'HelloJobPackage',
    package: packgeListDataSource[2],
    assemblyName: 'JobExample',
    namespace: 'JobExample',
    className: 'HelloWorldJob',
    executionPlan: '',
    createTime: new Date('03/10/2024 12:00:00').toLocaleString(),
    updateTime: new Date('03/10/2024 12:00:00').toLocaleString(),
  },
  {
    id: 2,
    name: 'DeplyJobScheduler',
    type: 'Cron',
    packageName: 'DeplyJobPackage',
    package: packgeListDataSource[4],
    assemblyName: 'JobExample',
    namespace: 'JobExample',
    className: 'DeplyJob',
    executionPlan: '*/5 * * * *',
    createTime: new Date('03/11/2024 12:00:00').toLocaleString(),
    updateTime: new Date('03/14/2024 12:00:00').toLocaleString(),
  },
  {
    id: 1,
    name: 'EchoJobScheduler',
    type: 'Cron',
    packageName: 'EchoJobPackage',
    package: packgeListDataSource[6],
    assemblyName: 'JobExample',
    namespace: 'JobExample',
    className: 'EchoJob',
    executionPlan: '1 4 4 * *',
    createTime: new Date('03/12/2024 12:00:00').toLocaleString(),
    updateTime: new Date('03/14/2024 12:00:00').toLocaleString(),
  },
];

function getScheduler(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.Scheduler & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...schedulerListDataSource];
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return (Object.keys(filter) as Array<keyof API.Scheduler>).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
  }

  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      (Object.keys(sorter) as Array<keyof API.Scheduler>).forEach((key) => {
        let nextSort = next?.[key] as number;
        let preSort = prev?.[key] as number;
        if (sorter[key] === 'descend') {
          if (preSort - nextSort > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (preSort - nextSort > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }

  dataSource = dataSource.slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {
    data: dataSource,
    total: schedulerListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postScheduler(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      //tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'add':
    case 'update':
    case 'stop':

    default:
      break;
  }

  const result = {
    list: schedulerListDataSource,
    pagination: {
      total: schedulerListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/scheduler': getScheduler,
  'POST /api/scheduler': postScheduler,
};
