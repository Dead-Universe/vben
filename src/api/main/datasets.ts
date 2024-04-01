import { defHttp } from '@/utils/http/axios';

enum Api {
  AREA_RECORD = '/cascader/getAreaRecord',
}

export const areaRecord = (data) => defHttp.get({ url: Api.AREA_RECORD, data });
