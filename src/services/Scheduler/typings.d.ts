declare namespace API {
  type Scheduler = {
    id: number;
    name: string;
    type: string;
    packageId: number;
    package: string;
    version: string;
    assemblyName: string;
    namespace: string;
    className: string;
    executionPlan: string;
    executionParams: string;
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
