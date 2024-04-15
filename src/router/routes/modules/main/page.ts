import type { AppRouteModule } from '@/router/types';

import { getParentLayout, LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const page: AppRouteModule = {
  path: '/page',
  name: 'Page',
  component: LAYOUT,
  redirect: '/page/list/basic', //如果路由直接匹配，则重定向到何处。重定向发生在任何导航保护之前，并触发具有新目标位置的新导航。
  meta: {
    orderNo: 100,
    icon: 'ion:aperture-outline',
    title: t('routes.main.page.page'),
  },
  children: [
    // =============================list start=============================
    {
      path: 'manager',
      name: 'ManagerPage',
      component: getParentLayout('ManagerPage'),
      redirect: '/page/manager/datasets', // TODO
      meta: {
        title: t('routes.main.page.manager.manager'),
      },
      children: [
        {
          path: 'datasets',
          name: 'DatasetsManagerPage',
          component: () => import('@/views/main/page/datasets/index.vue'),
          meta: {
            title: t('routes.main.page.datasetsManager'),
          },
        },
        {
          path: 'modelManagement',
          name: 'modalManagement',
          component: () => import('@/views/main/page/modelManagement/index.vue'),
          meta: {
            title: t('routes.main.page.modalManagement'),
          },
        },
        {
          path: 'trainingSetManagement',
          name: 'trainingSetManagement',
          component: () => import('@/views/main/page/trainingSetManagement/index.vue'),
          meta: {
            title: t('routes.main.page.trainingSetManagement'),
          },
        },
      ],
    },
    // =============================list end=============================
  ],
};

export default page;
