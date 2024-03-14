// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Job = {
    id: number;
    name: string;
    type: string;
    schedulerId: number;
    scheduler: Scheduler;
    status: string;
    scheduledExecutionTime: string;
    actualExecutionTime: string;
  };

  type JobList = {
    data?: Job[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
    pageSize?: number;
    pageNumber?: number;
  };
}
