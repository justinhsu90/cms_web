import asyncComponent from '@/common/until/asyncComponent'
export default [{
  name: 'platformSales',
  path: '/platformSales',
  component: asyncComponent('platformSales/platformSalesList'),
}]
    