import asyncComponent from '@/common/until/asyncComponent'
export default [{
    name: 'shipping',
    path: '/shipping',
    component: asyncComponent('shipping/shippingList'),
    meta: {
      sign: 'shipping'
    }
  },
  {
    name: 'shippingView',
    path: '/shippingView',
    component: asyncComponent('shipping/shippingView'),
    meta: {
      sign: 'shipping'
    }
  },
]
