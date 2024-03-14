import { Request, Response } from 'express';
import { parse } from 'url';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.PackageListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const id = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: id,
      name: `Package${id}`,
      version: `1.0.${id}`,
      storageAccount: `Storage${id}`,
      relativePath: `Path${id}`,
      ownerId: id,
      owner: {
        id: id,
        name: `Owner${id}`,
        pwd: `Password${id}`,
        email: `owner${id}@example.com`,
        createTime: '2024-03-14',
        updateTime: '2024-03-14',
      },
      description: `Description${id}`,
      createTime: '2024-03-14',
      updateTime: '2024-03-14',
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getPackage(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.PackageListItem & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      (Object.keys(sorter) as Array<keyof API.PackageListItem>).forEach((key) => {
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
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return (Object.keys(filter) as Array<keyof API.PackageListItem>).some((key) => {
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
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'post':
      (() => {
        const id = Math.ceil(Math.random() * 10000);
        const newPackage: API.PackageListItem = {
          id: id,
          name: `Package${id}`,
          version: `1.0.${id}`,
          storageAccount: `Storage${id}`,
          relativePath: `Path${id}`,
          ownerId: id,
          owner: {
            id: id,
            name: `Owner${id}`,
            pwd: `Password${id}`,
            email: `owner${id}@example.com`,
            createTime: '2024-03-14',
            updateTime: '2024-03-14',
          },
          description: `Description${id}`,
          createTime: '2024-03-14',
          updateTime: '2024-03-14',
        };
        tableListDataSource.unshift(newPackage);
        return res.json(newPackage);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/package': getPackage,
  'POST /api/package': postRule,
};
