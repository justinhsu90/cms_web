import VueRouter from 'vue-router' 
import Vue from 'vue'
import nav from '@/common/nav'
import login from '@/common/login'
import sku from '@/components/sku/sku'
import wocher from '@/components/wocher/wocher'
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
                component:sku
            },
            {
                path:'/wocher',
                component:wocher,
                meta:{
                    keepAlive:true
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
                component:purchaseEdit
            },
            {   name:'edit',
                path:'/edit',
                component:edit
            },
            {   name:'dataAnalysis',
                path:'/dataAnalysis',
                component:dataAnalysis
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
                component:documentEdit
            },
            {   name:'documentAdd',
                path:'/documentAdd',
                component:documentAdd
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
                component:purchaAdd
            }, 
            {   name:'purchaEdit',
                path:'/purchaEdit',
                component:purchaEdit
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
                component:erpPurchaseAdd
            }, 
            {   name:'erpPurchaseEdit',
                path:'/erpPurchaseEdit',
                component:erpPurchaseEdit
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
