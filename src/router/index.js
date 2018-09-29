import VueRouter from 'vue-router'
import Vue from 'vue'
import nav from '@/common/nav'
import login from '@/common/login'

import skuList from '@/components/sku/skuList'
import skuAdd from '@/components/sku/skuAdd'
import skuEdit from '@/components/sku/skuEdit'

import wowcherOrderList from '@/components/wowcher/wowcherOrder/wowcherOrderList'
import wowcherTrackingStatus from '@/components/wowcher/wowcherOrder/wowcherTrackingStatus'
import wowcherOrderView from '@/components/wowcher/wowcherOrder/wowcherOrderView'
import wowcherDealList from '@/components/wowcher/wowcherDeal/wowcherDealList'
import wowcherDealEdit from '@/components/wowcher/wowcherDeal/wowcherDealEdit'
import wowcherDealAdd from '@/components/wowcher/wowcherDeal/wowcherDealAdd'

import upcAdd from '@/components/upc/upcAdd'
import upcEdit from '@/components/upc/upcEdit'
import upcList from '@/components/upc/upcList'

import singleLetter from '@/components/singleLetter/singleLetter'

import replacementList from '@/components/wowcher/wowcherReplacement/replacementList'
import replacementAdd from '@/components/wowcher/wowcherReplacement/replacementAdd'
import replacementEdit from '@/components/wowcher/wowcherReplacement/replacementEdit'
import replacementCheck from '@/components/wowcher/wowcherReplacement/replacementCheck'

import wowcherSampleList from '../components/wowcher/wowcherSample/sampleList'
import wowcherSampleEdit from '@/components/wowcher/wowcherSample/sampleEdit'
import wowcherSampleAdd from '@/components/wowcher/wowcherSample/sampleAdd'

import dataAnalysis from '@/components/dataAnalysis/dataAnalysis'

import documentManage from '@/components/documentManage/documentManage'
import documentEdit from '@/components/documentManage/documentEdit'
import documentAdd from '@/components/documentManage/documentAdd'

import shipment from '@/components/shipment/shipment'
import shipmentEdit from '@/components/shipment/shipmentEdit'
import shipmentAdd from '@/components/shipment/shipmentAdd'

import purchaRequire from '@/components/erp/purchaRequire/purchaRequire'
import purchaAdd from '@/components/erp/purchaRequire/purchaAdd'
import purchaEdit from '@/components/erp/purchaRequire/purchaEdit'

import erpPurchase from '@/components/erp/purchase/purchase'
import erpPurchaseAdd from '@/components/erp/purchase/purchaseAdd'
import erpPurchaseEdit from '@/components/erp/purchase/purchaseEdit'

import erpSale from '@/components/erp/sale/sale'
import erpSaleAdd from '@/components/erp/sale/saleAdd'
import erpSaleEdit from '@/components/erp/sale/saleEdit'

import paymentList from '@/components/erp/payment/paymentList'
import paymentAdd from '@/components/erp/payment/paymentAdd'
import paymentEdit from '@/components/erp/payment/paymentEdit'


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
      children: [{
          path: '/sku',
          component: skuList,
          meta: {
            keepAlive: true
          }
        },
        {
          name:'skuAdd',
          path: '/skuAdd',
          component: skuAdd,
          meta: {
            sign:'sku'
          }
        },
        {
          name:'skuEdit',
          path: '/skuEdit',
          component: skuEdit,
          meta: {
            sign:'sku'
          }
        },
        {
          path: '/dataAnalysis',
          component: dataAnalysis,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'upcList',
          path: '/upc',
          component: upcList,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'upcAdd',
          path: '/upcAdd',
          component: upcAdd,
          meta: {
            sign: 'upcList'
          }
        },
        {
          name: 'upcEdit',
          path: '/upcEdit',
          component: upcEdit,
          meta: {
            sign: 'upcList'
          }
        },
        {
          name: 'singleLetter',
          path: '/singleLetter',
          component: singleLetter,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'wowcherDealList',
          path: '/wowcherDealList',
          component: wowcherDealList,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'wowcherDealEdit',
          path: '/wowcherDealEdit',
          component: wowcherDealEdit,
          meta: {
            sign: 'wowcherDealList'
          }
        },
        {
          name: 'wowcherDealAdd',
          path: '/wowcherDealAdd',
          component: wowcherDealAdd,
          meta: {
            sign: 'wowcherDealList'
          }
        },
        {
          name: 'wowcherOrderList',
          path: '/wowcher',
          component: wowcherOrderList,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'wowcherTrackingStatus',
          path: '/wowcher',
          component: wowcherTrackingStatus,
          meta: {
            sign: 'wowcherOrderList'
          }
        },
        {
          name: 'wowcherOrderView',
          path: '/wowcherOrderView',
          component: wowcherOrderView,
          meta: {
            sign: 'wowcherOrderList'
          }
        },
        {
          name: 'replacement',
          path: '/replacement',
          component: replacementList,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'replacementAdd',
          path: '/replacementAdd',
          component: replacementAdd,
          meta: {
            sign: 'replacement'
          }
        },
        {
          name: 'replacementCheck',
          path: '/replacementCheck',
          component: replacementCheck,
          meta: {
            sign: 'replacement'
          }
        },
        {
          name: 'replacementEdit',
          path: '/replacementEdit',
          component: replacementEdit,
          meta: {
            sign: 'replacement'
          }
        },
        {
          name: 'wowcherSample',
          path: '/wowcherSample',
          component: wowcherSampleList,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'wowcherSampleAdd',
          path: '/wowcherSampleAdd',
          component: wowcherSampleAdd,
          meta: {
            sign: 'wowcherSample'
          }
        },
        {
          name: 'wowcherSampleEdit',
          path: '/wowcherSampleEdit',
          component: wowcherSampleEdit,
          meta: {
            sign: 'wowcherSample'
          }
        },
      
        {
          name: 'documentManage',
          path: '/documentManage',
          component: documentManage,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'documentEdit',
          path: '/documentEdit',
          component: documentEdit,
          meta: {
            sign: 'documentManage'
          }
        },
        {
          name: 'documentAdd',
          path: '/documentAdd',
          component: documentAdd,
          meta: {
            sign: 'documentManage'
          }
        },
        {
          name: 'shipment',
          path: '/shipment',
          component: shipment,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'shipmentEdit',
          path: '/shipmentEdit',
          component: shipmentEdit,
          meta: {
            sign: 'shipment'
          }
        },
        {
          name: 'shipmentAdd',
          path: '/shipmentAdd',
          component: shipmentAdd,
          meta: {
            sign: 'shipment'
          }
        },
        {
          name: 'purchaRequire',
          path: '/purchaRequire',
          component: purchaRequire,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'purchaAdd',
          path: '/purchaAdd',
          component: purchaAdd,
          meta: {
            sign: 'purchaRequire'
          }
        },
        {
          name: 'purchaEdit',
          path: '/purchaEdit',
          component: purchaEdit,
          meta: {
            sign: 'purchaRequire'
          }
        },
        {
          name: 'erpPurchase',
          path: '/erpPurchase',
          component: erpPurchase,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'erpPurchaseAdd',
          path: '/erpPurchaseAdd',
          component: erpPurchaseAdd,
          meta: {
            sign: 'erpPurchase'
          }
        },
        {
          name: 'erpPurchaseEdit',
          path: '/erpPurchaseEdit',
          component: erpPurchaseEdit,
          meta: {
            sign: 'erpPurchase'
          }
        },
        {
          name: 'erpSale',
          path: '/erpSale',
          component: erpSale,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'erpSaleAdd',
          path: '/erpSaleAdd',
          component: erpSaleAdd,
          meta: {
            sign: 'erpSale'
          }
        },
        {
          name: 'erpSaleEdit',
          path: '/erpSaleEdit',
          component: erpSaleEdit,
          meta: {
            sign: 'erpSale'
          }
        },
        {
          name: 'payment',
          path: '/payment',
          component: paymentList,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'paymentAdd',
          path: '/paymentAdd',
          component: paymentAdd,
          meta: {
            sign: 'payment'
          }
        },
        {
          name: 'paymentEdit',
          path: '/paymentEdit',
          component: paymentEdit,
          meta: {
            sign: 'payment'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})


export default router;
