// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取规则列表 GET /api/scheduler */
export async function getScheduler(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.SchedulerList>('/api/scheduler', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateScheduler(options?: { [key: string]: any }) {
  return request<API.Scheduler>('/api/scheduler', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

export async function addScheduler(options?: { [key: string]: any }) {
  return request<API.Scheduler>('/api/scheduler', {
    method: 'POST',
    data: {
      method: 'add',
      ...(options || {}),
    },
  });
}

export async function removeScheduler(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/scheduler', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}

export async function stopScheduler(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/scheduler', {
    method: 'POST',
    data: {
      method: 'stop',
      ...(options || {}),
    },
  });
}
