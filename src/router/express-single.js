import asyncComponent from '@/common/until/asyncComponent'
export default [{
    name: 'express-single',
    path: '/single',
    component: asyncComponent('express-single/single-list'),
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'single-edit',
    path: '/singleEdit',
    component: asyncComponent('express-single/single-edit'),
    meta: {
      sign: 'single'
    }
  },
]
