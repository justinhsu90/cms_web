import VueRouter from 'vue-router'
import Vue from 'vue'
import nav from '@/common/nav'
import login from '@/common/login'
import asyncComponent from '@/common/until/asyncComponent'

import skuList from '@/components/sku/skuList'
import skuAdd from '@/components/sku/skuAdd'
import skuEdit from '@/components/sku/skuEdit'

import wowcherDealList from '@/components/wowcher/wowcherDeal/wowcherDealList'
import wowcherDealEdit from '@/components/wowcher/wowcherDeal/wowcherDealEdit'
import wowcherDealAdd from '@/components/wowcher/wowcherDeal/wowcherDealAdd'

import upcAdd from '@/components/upc/upcAdd'
import upcEdit from '@/components/upc/upcEdit'
import upcList from '@/components/upc/upcList'

import singleLetter from '@/components/singleLetter/singleLetter'

import replacementList from '@/components/wowcherReplacement/replacementList'
import replacementAdd from '@/components/wowcherReplacement/replacementAdd'
import replacementEdit from '@/components/wowcherReplacement/replacementEdit'
import replacementCheck from '@/components/wowcherReplacement/replacementCheck'

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


import receivable from '@/components/erp/purchaseReceivable/receivable'
import receivableAdd from '@/components/erp/purchaseReceivable/receivableAdd'
import receivableEdit from '@/components/erp/purchaseReceivable/receivableEdit'

import receivableReport from '@/components/erp/receivableReport/receivableReport'
import receivableReportAdd from '@/components/erp/receivableReport/receivableReportAdd'
import receivableReportEdit from '@/components/erp/receivableReport/receivableReportEdit'

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
      path: '/404',
      component: asyncComponent('404/404'),
      meta: {
        name: '404'
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
          name: 'orderList',
          path: '/orderList',
          component: asyncComponent('order/orderList'),
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'orderView',
          path: '/orderView',
          component: asyncComponent('order/orderView'),
          meta: {
            sign: 'orderList'
          }
        },
        {
          name: 'trackingStatus',
          path: '/trackingStatus',
          component: asyncComponent('order/trackingStatus'),
          meta: {
            sign: 'orderList'
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
          name: 'receivable',
          path: '/receivable',
          component: receivable,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'receivableAdd',
          path: '/receivableAdd',
          component: receivableAdd,
          meta: {
            sign: 'receivable'
          }
        },
        {
          name: 'receivableEdit',
          path: '/receivableEdit',
          component: receivableEdit,
          meta: {
            sign: 'receivable'
          }
        },
        {
          name: 'receivableReport',
          path: '/receivableReport',
          component: receivableReport,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'receivableReportAdd',
          path: '/receivableReportAdd',
          component: receivableReportAdd,
          meta: {
            sign: 'receivableReport'
          }
        },
        {
          name: 'receivableReportEdit',
          path: '/receivableReportEdit',
          component: receivableReportEdit,
          meta: {
            sign: 'receivableReport'
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
        },
        {
          name: 'excelUpload',
          path: '/excelUpload',          
          component: asyncComponent('excelUpload/excelUploadList'),
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'addUpload',
          path: '/addUpload',          
          component: asyncComponent('excelUpload/excelUploadFile'),
          meta: {
            sign: 'excelUpload'
          }
        },
        {
          name: 'shipping',
          path: '/shipping',          
          component: asyncComponent('shipping/shippingList'),
          meta: {
            sign: 'shipping'
          }
        },
        {
          name: 'shippingView',
          path: '/shippingView',          
          component: asyncComponent('shipping/shippingView'),
          meta: {
            sign: 'shipping'
          }
        },
        {
          name: 'inventory',
          path: '/inventoryList',          
          component: asyncComponent('inventory/inventoryList'),
        },
        {
          name: 'inventoryAdd',
          path: '/inventoryAdd',          
          component: asyncComponent('inventory/inventoryAdd'),
          meta: {
            sign: 'inventoryList'
          }
        },
        {
          name: 'scriptExecution',
          path: '/scriptExecutionList',          
          component: asyncComponent('scriptExecution/scriptExecutionList'),
        },
        {
          name: 'scriptExecutionAdd',
          path: '/scriptExecutionAdd',          
          component: asyncComponent('scriptExecution/scriptExecutionAdd'),
          meta: {
            sign: 'scriptExecutionList'
          }
        },
        {
          name: 'generateFile',
          path: '/generateFile',          
          component: asyncComponent('generateFile/generateFileList'),
          meta: {
            sign: 'generateFile'
          }
        },
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})


export default router;
