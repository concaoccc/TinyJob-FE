// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Package = {
    id: number;
    name: string;
    version: string;
    storageAccount: string;
    relativePath: string;
    description: string;
    createTime: string;
    updateTime: string;
  };

  type PackageList = {
    data?: Package[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
    pageSize?: number;
    pageNumber?: number;
  };
}
