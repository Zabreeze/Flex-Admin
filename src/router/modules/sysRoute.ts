export default {
  path: '/sys',
  name: 'sys',
  component: () => import('@/layouts/index.vue'),
  redirect: '/sys/sku',
  meta: {
    title: 'sys',
  },
  children: [
    {
      path: 'sku',
      name: 'sku',
      component: () => import('@/views/sys/sku.vue'),
      meta: {
        title: 'sku',
      },
    },
    {
      path: 'sgu',
      name: 'sgu',
      component: () => import('@/views/sys/sgu.vue'),
      meta: {
        title: 'sgu',
      },
    },
  ],
}
