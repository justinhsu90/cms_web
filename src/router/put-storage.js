import asyncComponent from '@/common/until/asyncComponent'
export default [{
    name: 'put-storage',
    path: '/put-storage',
    component: asyncComponent('erp/put-storage/put-storage-list'),
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'put-storage-add',
    path: '/put-storage-add',
    component: asyncComponent('erp/put-storage/put-storage-add'),
    meta: {
      sign: 'payment'
    }
  },
  {
    name: 'put-storage-edit',
    path: '/put-storage-edit',
    component: asyncComponent('erp/put-storage/put-storage-edit'),
    meta: {
      sign: 'payment'
    }
  },
]
