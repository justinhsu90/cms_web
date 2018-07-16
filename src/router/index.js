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
                component:wocher
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
                component:documentManage
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
