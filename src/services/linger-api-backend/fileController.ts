// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** uploadFile POST /api/file/upload */
export async function uploadFileUsingPost(body: string, options?: { [key: string]: any }) {
  return request<API.BaseResponseMapstring>('/api/file/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** uploadFiles POST /api/file/uploads */
export async function uploadFilesUsingPost(body: string, options?: { [key: string]: any }) {
  return request<API.BaseResponseMapstring>('/api/file/uploads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
