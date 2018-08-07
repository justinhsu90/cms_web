import VueRouter from 'vue-router' 
import Vue from 'vue'
import nav from '@/common/nav'
import login from '@/common/login'
import sku from '@/components/sku/sku'
import wowcher from '@/components/wowcher/wowcher'
import wowcherEdit from '@/components/wowcher/wowcherEdit'
import wowcherDealList from '@/components/wowcher/wowcherDealList'
import wowcherDealEdit from '@/components/wowcher/wowcherDealEdit'
import wowcherDealAdd from '@/components/wowcher/wowcherDealAdd'
import edit from '@/components/tinymce/tinymce'
import purchase from '@/components/purchase/purchase'
import purchaseEdit from '@/components/purchase/purchaseEdit'
import dataAnalysis from '@/components/dataAnalysis/dataAnalysis'
import documentManage from '@/components/documentManage/documentManage'
import documentEdit from '@/components/documentManage/documentEdit'
import documentAdd from '@/components/documentManage/documentAdd'
import purchaRequire from '@/components/erp/purchaRequire/purchaRequire'
import purchaAdd from '@/components/erp/purchaRequire/purchaAdd'
import purchaEdit from '@/components/erp/purchaRequire/purchaEdit'
import erpPurchase from '@/components/erp/purchase/purchase'
import erpPurchaseAdd from '@/components/erp/purchase/purchaseAdd'
import erpPurchaseEdit from '@/components/erp/purchase/purchaseEdit'
Vue.use(VueRouter);
let router = new VueRouter({
  routes: [{
      path: '/',
      component: login,
      meta:{
          name:'login'
      }
    },
    {
        path: '/nav',
        component:nav,
        redirect:'/sku',
        children:[
            {
                path:'/sku',
                component:sku,
                meta:{
                    keepAlive:true
                }
            },
            {   
                path:'/dataAnalysis',
                component:dataAnalysis,
                meta:{
                    keepAlive:true
                }
            },
            {
                name:'wowcher',    
                path:'/wowcher',
                component:wowcher,
                meta:{
                    keepAlive:true
                }
            },
            {
                name:'wowcherDealList',
                path:'/wowcherDealList',
                component:wowcherDealList,
                meta:{
                    sign:'wowcher'
                }
            },
            {
                name:'wowcherDealEdit',
                path:'/wowcherDealEdit',
                component:wowcherDealEdit,
                meta:{
                    sign:'wowcher'
                }
            },
            {
                name:'wowcherDealAdd',
                path:'/wowcherDealAdd',
                component:wowcherDealAdd,
                meta:{
                    sign:'wowcher'
                }
            },
            {
                name:'wowcherEdit',
                path:'/wowcherEdit',
                component:wowcherEdit,
                meta:{
                    sign:'wowcher'
                }
            },
            {
                path:'/purchase',
                component:purchase,
                meta:{
                    keepAlive:true
                }
            },
            {   name:'purchaseEdit',
                path:'/purchase/:id',
                component:purchaseEdit,
                meta:{
                    sign:'purchase'
                }
            },
            {   name:'edit',
                path:'/edit',
                component:edit
            },
            {   name:'documentManage',
                path:'/documentManage',
                component:documentManage,
                meta:{
                    keepAlive:true
                }
            },        
            {   name:'documentEdit',
                path:'/documentEdit',
                component:documentEdit,
                meta:{
                    sign:'documentManage'
                }
            },
            {   name:'documentAdd',
                path:'/documentAdd',
                component:documentAdd,
                meta:{
                    sign:'documentManage'
                }
            },
            {   name:'purchaRequire',
                path:'/purchaRequire',
                component:purchaRequire,
                meta:{
                    keepAlive:true
                }
            },
            {   name:'purchaAdd',
                path:'/purchaAdd',
                component:purchaAdd,
                meta:{
                    sign:'purchaRequire'
                }
            }, 
            {   name:'purchaEdit',
                path:'/purchaEdit',
                component:purchaEdit,
                meta:{
                    sign:'purchaRequire'
                }
            },
            {   name:'erpPurchase',
                path:'/erpPurchase',
                component:erpPurchase,
                meta:{
                    keepAlive:true
                }
            },
            {   name:'erpPurchaseAdd',
                path:'/erpPurchaseAdd',
                component:erpPurchaseAdd,
                meta:{
                    sign:'erpPurchase'
                }
            }, 
            {   name:'erpPurchaseEdit',
                path:'/erpPurchaseEdit',
                component:erpPurchaseEdit,
                meta:{
                    sign:'erpPurchase'
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
