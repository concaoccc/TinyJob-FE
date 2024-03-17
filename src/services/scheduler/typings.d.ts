declare namespace API {
  type Scheduler = {
    id: number;
    name: string;
    type: string;
    packageName: string;
    package: Package;
    assemblyName: string;
    namespace: string;
    className: string;
    executionPlan: string;
    createTime: string;
    updateTime: string;
  };

  type SchedulerList = {
    data?: Scheduler[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
    pageSize?: number;
    pageNumber?: number;
  };
}
