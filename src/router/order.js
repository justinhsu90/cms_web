import asyncComponent from '@/common/until/asyncComponent'
export default [{
    name: 'orderList',
    path: '/orderList',
    component: asyncComponent('order/orderList'),
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'orderView',
    path: '/orderView',
    component: asyncComponent('order/orderView'),
    meta: {
      sign: 'orderList'
    }
  },
  {
    name: 'trackingStatus',
    path: '/trackingStatus',
    component: asyncComponent('order/trackingStatus'),
    meta: {
      sign: 'orderList'
    }
  },
]
