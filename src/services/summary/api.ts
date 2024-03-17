import { request } from '@umijs/max';

/** Get package list GET /api/package */
/* set default value for function paramter */

export async function getSummary(datesBefore: number, options?: { [key: string]: any }) {
  return request<API.Summary>('/api/summary', {
    method: 'GET',
    params: {
      datesBefore: datesBefore,
    },
    ...(options || {}),
  });
}
