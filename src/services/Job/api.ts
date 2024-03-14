import { request } from '@umijs/max';

/** Get package list GET /api/package */
export async function getJob(
  params: {
    pageNumber?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/job', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
