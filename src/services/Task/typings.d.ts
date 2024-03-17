// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Task = {
    id: number;
    name: string;
    type: string;
    schedulerName: string;
    scheduler: Scheduler;
    status: string;
    scheduledExecutionTime: string;
    actualExecutionTime: string;
  };

  type TaskList = {
    data?: Task[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
    pageSize?: number;
    pageNumber?: number;
  };
}
