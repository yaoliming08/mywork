import { createRouter, createWebHistory } from 'vue-router'
import  Layout from '@/views/layout/index.vue'
import  bigScreen from '@/views/big-screen/big-screen.vue'
import  dataScreen from '@/views/data-screen/data-screen.vue'
// import  dataScreen from '@/views/data-screen/index.vue'


const MaxRoute = [

  {
    path: '/Information-aggregation',
    name: 'InformationAggregation',
    component: () => import('@/views/Information-aggregation/Information-aggregation.vue')
  },
  {
    path: '/big-screen',
    name: 'bigScreen',
    component: bigScreen,
  },
  {
    path: '/data-screen',
    name: 'dataScreen',
    component: dataScreen,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },


]




//一级菜单
const oneRoute = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home.vue')
  },
  {
    path: '/policy-information',
    name: 'policyInformation',
    component: () => import('@/views/policy-information/policy-information.vue')
  },

  {
    path: '/data-element',
    name: 'dataElement',
    component: () => import('@/views/data-element/data-element.vue')
  },
  {
    path: '/current-user-center',
    name: 'userCenter',
    component: () => import('@/views/user-center/user-center.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/detail/detail.vue')
  },
  {
    name: "financialSupermarket",
    path:'/financial-supermarket',
    component: () => import('@/views/financial-supermarket/financial-supermarket.vue')
  },
  {
    name: "dataScenario",
    path:'/data-scenario',
    component: () => import('@/views/data-scenario/data-scenario.vue')
  },

  {
    name: "dataOutcome",
    path:'/data-outcome',
    component: () => import('@/views/data-outcome/data-outcome.vue')
  },

  
  {
    name: "characteristicFinance",
    path:'/characteristic-finance',
    component: () => import('@/views/characteristic-finance/characteristic-finance.vue')
  },
  {
    name: "financingInstitution",
    path:'/financing-institution',
    component: () => import('@/views/financing-institution/financing-institution.vue')
  },
  {
    name: "aboutUs",
    path:'/about-us',
    component: () => import('@/views/about-us/about-us.vue')
  },
  {
    name: "regionalPlatform",
    path:'/regional-platform',
    component: () => import('@/views/regional-platform/regional-platform.vue')
  },
]

// 二级菜单
const twoRoute = [
  // {
  //   path: '/Information-aggregation',
  //   name: 'InformationAggregation',
  //   component: () => import('@/views/Information-aggregation/Information-aggregation.vue')
  // },
  {
    path: '/financing-assurance',
    name: 'financingAssurance',
    component: () => import('@/views/financing-assurance/financing-assurance.vue')
  },

  {
    path: '/policy-support',
    name: 'policySupport',
    component: () => import('@/views/policy-support/policy-support.vue')
  },
  {
    path: '/Financing-docking',
    name: 'FinancingDocking',
    component: () => import('@/views/Financing-docking/Financing-docking.vue')
  },
  {
    path: '/Financing-evaluation',
    name: 'FinancingEvaluation',
    component: () => import('@/views/Financing-evaluation/Financing-evaluation.vue')
  },

]









const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainRouter',
      
      component: Layout,
      // component: dataScreen,
      
      children:[
        ...oneRoute,
        ...twoRoute
      ]
    },
    ...MaxRoute

  ]
})

export default router
