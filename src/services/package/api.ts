import { request } from '@umijs/max';

/** Get package list GET /api/package */
export async function getPackage(
  params: {
    pageNumber?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.PackageList>('/api/package', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** add package POST /api/rule */
export async function addPackage(options?: { [key: string]: any }) {
  return request<API.Package>('/api/package', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}
