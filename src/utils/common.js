import { HTTP_STATUS_CODE } from '@/constants';

export const isResponseOk = (response) => response?.status === HTTP_STATUS_CODE.OK;