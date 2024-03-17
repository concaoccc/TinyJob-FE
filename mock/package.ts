import { Request, Response } from 'express';
import { parse } from 'url';

export let packgeListDataSource: API.Package[] = [
  /*Generate mock data for package */
  {
    id: 1,
    name: 'HelloJobPackage',
    version: '1.0.1',
    storageAccount: 'JobBuilds',
    relativePath: 'HelloJobPackage/1.0.1',
    description: 'echo hello world package 1',
    createTime: new Date('03/01/2024 12:00:00').toLocaleString(),
    updateTime: new Date('03/05/2024 12:00:00').toLocaleString(),
  },
  {
    id: 2,
    name: 'HelloJobPackage',
    version: '1.0.2',
    storageAccount: 'JobBuilds',
    relativePath: 'HelloJobPackage/1.0.2',
    description: 'echo hello world package 2',
    createTime: new Date('03/02/2024 12:00:00').toLocaleString(),
    updateTime: new Date('03/12/2024 12:00:00').toLocaleString(),
  },
  {
    id: 3,
    name: 'HelloJobPackage',
    version: '1.0.3',
    storageAccount: 'JobBuilds',
    relativePath: 'HelloJobPackage/1.0.3',
    description: 'echo hello world package 3',
    createTime: new Date('03/04/2024 12:00:00').toLocaleString(),
    updateTime: new Date('03/04/2024 12:00:00').toLocaleString(),
  },
  {
    id: 4,
    name: 'DeplyJobPackage',
    version: '1.0.1',
    storageAccount: 'JobBuilds',
    relativePath: 'DeplyJobPackage/1.0.1',
    description: 'delay job package 1',
    createTime: new Date('03/05/2024 12:00:00').toLocaleString(),
    updateTime: new Date('03/09/2024 12:00:00').toLocaleString(),
  },
  {
    id: 5,
    name: 'DeplyJobPackage',
    version: '1.1.0',
    storageAccount: 'JobBuilds',
    relativePath: 'DeplyJobPackage/1.1.0',
    description: 'delay job package 2',
    createTime: new Date('03/06/2024 12:00:00').toLocaleString(),
    updateTime: new Date('03/08/2024 12:00:00').toLocaleString(),
  },
  {
    id: 6,
    name: 'EchoJobPackage',
    version: '1.1.0',
    storageAccount: 'JobBuilds',
    relativePath: 'EchoJobPackage/1.1.0',
    description: 'Echo Job package 1',
    createTime: new Date('03/07/2024 12:00:00').toLocaleString(),
    updateTime: new Date('03/09/2024 12:00:00').toLocaleString(),
  },
  {
    id: 7,
    name: 'EchoJobPackage',
    version: '1.2.0',
    storageAccount: 'JobBuilds',
    relativePath: 'EchoJobPackage/1.2.0',
    description: 'Echo Job package 2',
    createTime: new Date('03/08/2024 12:00:00').toLocaleString(),
    updateTime: new Date('03/14/2024 12:00:00').toLocaleString(),
  },
];

function getPackage(req: Request, res: Response, u: string) {
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

  let dataSource = packgeListDataSource;

  if (params.name) {
    dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
  }

  dataSource = [...packgeListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  const result = {
    data: dataSource,
    total: packgeListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postPackage(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, id, name, version, storageAccount, relativePath, description } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'post':
      (() => {
        const id = Math.ceil(Math.random() * 100);
        const newPackage: API.Package = {
          id: id,
          name: name,
          version: version,
          storageAccount: storageAccount,
          relativePath: relativePath,
          description: description,
          createTime: '2024-03-14',
          updateTime: '2024-03-14',
        };
        packgeListDataSource.push(newPackage);
        return res.json(newPackage);
      })();
      return;
    case 'delete':
      (() => {
        packgeListDataSource = packgeListDataSource.filter(
          (item) => name.indexOf(item.name) === -1,
        );
      })();
      break;
    case 'update':
      (() => {
        let newPackage = {};
        packgeListDataSource = packgeListDataSource.map((item) => {
          if (item.name === name) {
            newPackage = { ...item, name, version, storageAccount, relativePath, description };
            return { ...item, name, version, storageAccount, relativePath, description };
          }
          return item;
        });
        return res.json(newPackage);
      })();
      break;
    default:
      break;
  }

  const result = {
    list: packgeListDataSource,
    pagination: {
      total: packgeListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/package': getPackage,
  'POST /api/package': postPackage,
};
