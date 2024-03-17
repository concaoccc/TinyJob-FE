// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Summary = {
    totalTask: number;
    totalPackage: number;
    totalScheduler: number;
    success: boolean;
    taskSummary: TaskSummayDaily[];
  };

  type TaskSummayDaily = {
    date: String;
    totalCount: number;
    FailedCount: number;
    SucceededCound: number;
  };
}
