import asyncComponent from '@/common/until/asyncComponent'
export default [
    {
        path: '/sku',
        component: asyncComponent('sku/skuList'),
        meta: {
          keepAlive: true
        }
      },
      {
        name:'skuAdd',
        path: '/skuAdd',
        component: asyncComponent('sku/skuAdd'),
        meta: {
          sign:'sku'
        }
      },
      {
        name:'skuEdit',
        path: '/skuEdit',
        component: asyncComponent('sku/skuEdit'),
        meta: {
          sign:'sku'
        }
      },
]
