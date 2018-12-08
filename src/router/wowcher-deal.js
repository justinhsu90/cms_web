import asyncComponent from '@/common/until/asyncComponent'
export default [
    {
        name: 'wowcherDealList',
        path: '/wowcherDealList',
        component: asyncComponent('wowcher/wowcherDeal/wowcherDealList'),
        meta: {
          keepAlive: true
        }
      },
      {
        name: 'wowcherDealEdit',
        path: '/wowcherDealEdit',
        component: asyncComponent('wowcher/wowcherDeal/wowcherDealEdit'),
        meta: {
          sign: 'wowcherDealList'
        }
      },
      {
        name: 'wowcherDealAdd',
        path: '/wowcherDealAdd',
        component: asyncComponent('wowcher/wowcherDeal/wowcherDealAdd'),
        meta: {
          sign: 'wowcherDealList'
        }
      },
]
