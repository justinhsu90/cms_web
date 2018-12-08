import asyncComponent from '@/common/until/asyncComponent'
export default [
    {
        name: 'wowcherSample',
        path: '/wowcherSample',
        component: asyncComponent('wowcher/wowcherSample/sampleList'),
        meta: {
          keepAlive: true
        }
      },
      {
        name: 'wowcherSampleAdd',
        path: '/wowcherSampleAdd',
        component:asyncComponent('wowcher/wowcherSample/sampleAdd'),
        meta: {
          sign: 'wowcherSample'
        }
      },
      {
        name: 'wowcherSampleEdit',
        path: '/wowcherSampleEdit',
        component: asyncComponent('wowcher/wowcherSample/sampleEdit'),
        meta: {
          sign: 'wowcherSample'
        }
      },
]
