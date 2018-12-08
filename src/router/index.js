import VueRouter from 'vue-router'
import Vue from 'vue'
import nav from '@/common/nav'
import login from '@/common/login'
import asyncComponent from '@/common/until/asyncComponent'
import four from './404'
import sku from './sku'
import dataAnalysis from './dataAnalysis'
import upc from './upc';
import singleLetter from './singleLetter'
import wowcherDeal from './wowcher-deal'
import wowcherReplenish from './wowcherReplenish'
import order from './order'
import replacement from './replacement'
import wowcherSample from './wowcher-sample';
import documentManage from './document';
import shipment from './shipment';
import expressSingle from './express-single';
import purcha from './purcha';
import receivable from './receivable'
import receivableReport from './receivable-report'
import erpPurchase from './erp-purchase'
import erpSale from './erp-sale';
import payment from './payment';
import putStorage from './put-storage'
import excelUpload from './excel-upload';
import shipping from './shipping'
import inventory from './inventory'
import scriptExecution from './scriptExecution'
import generateFile from './generateFile'
import setship from './setship'
import saleReport from './sale-report'
Vue.use(VueRouter);
let router = new VueRouter({
  routes: [{
      path: '/',
      component: login,
      meta: {
        name: 'login'
      }
    },
    {
      path: '/nav',
      component: nav,
      redirect: '/sku',
      children: [
        ...four,
        ...sku,
        ...dataAnalysis,
        ...upc,
        ...singleLetter,
        ...wowcherDeal,
        ...wowcherReplenish,
        ...order,
        ...replacement,
        ...wowcherSample,
        ...documentManage,
        ...shipment,
        ...expressSingle,
        ...purcha,
        ...receivable,
        ...receivableReport,
        ...erpPurchase,
        ...erpSale,
        ...payment,
        ...putStorage,
        ...excelUpload,
        ...shipping,
        ...inventory,
        ...scriptExecution,
        ...generateFile,
        ...setship,
        ...saleReport,{
          path:'/try',
          component:asyncComponent('trya/try')
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})


export default router;
