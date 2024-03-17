import { request } from '@umijs/max';

/** Get package list GET /api/package */
/* set default value for function paramter */

export async function getTask(
  params:
    | {
        current: number | undefined;
        pageSize?: number | undefined;
      }
    | undefined,
  options?: { [key: string]: any },
) {
  return request<API.TaskList>('/api/task', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
