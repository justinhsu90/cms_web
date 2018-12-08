import asyncComponent from '@/common/until/asyncComponent'
export default [
  {
    name: 'singleLetter',
    path: '/singleLetter',
    component: asyncComponent('singleLetter/singleLetter'),
    meta: {
      keepAlive: true
    }
  }
]
