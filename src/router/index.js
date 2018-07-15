import VueRouter from 'vue-router'
import Vue from 'vue'
import nav from '@/common/nav'
import login from '@/components/login'
import table from '@/components/table'
import search from '@/components/search'
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
                component:table
            },
            {
                path:'/search',
                component:search
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
