import VueRouter from 'vue-router'
import Vue from 'vue'
import nav from '@/common/nav'
import login from '@/components/login'
import table from '@/components/table'
import search from '@/components/search'
import purchase from '@/components/purchase/purchase'
import purchaseEdit from '@/components/purchase/purchaseEdit'
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
                component:purchase
            },
            {   name:'purchaseEdit',
                path:'/purchase/:id',
                component:purchaseEdit
            },    
        ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})


export default router;
