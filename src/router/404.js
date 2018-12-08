import asyncComponent from '@/common/until/asyncComponent'
export default [{
  path: '/404',
  component: asyncComponent('404/404'),
  meta: {
    name: '404'
  }
}]
