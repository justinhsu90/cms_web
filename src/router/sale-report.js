import asyncComponent from '@/common/until/asyncComponent'
export default [{
  name: 'sale-report',
  path: '/reportList',
  component: asyncComponent('sale-report/report-list'),
}, ]
