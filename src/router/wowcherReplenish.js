import asyncComponent from '@/common/until/asyncComponent'
export default [{
  name: 'wowcherReplenish',
  path: '/wowcherReplenish',
  component: asyncComponent('wowcher/wowcherReplenish/wowcherReplenishList'),
}]
