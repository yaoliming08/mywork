
const tabList = [
  {
    name: "首页",
    id: 1,
    path:'/home',
  },
  {
    name: "数据要素",
    id: 2,
    path:'/data-element',
  },
  {
    name: "数据场景",
    id: 3,
    path:'/data-scenario',
  },
  {
    name: "数据成果",
    id: 4,
    path:'/data-outcome',
  },
  {
    name: "联系我们",
    id: 5,
    path:'/about-us',
  }, 
  // {
  //   name: "用户中心",
  //   id: 4,
  //   path:'/current-user-center',
  // }, 
]


const flowList = [
  {
    name:'登录注册',
    count:'企业登录后方可申请贷款产品',
    src: new URL("@/assets/img/flow/flow1.png", import.meta.url),

  },
  {
    name:'填写融资需求',
    count:'根据融资需求完成资料填写',
    src: new URL("@/assets/img/flow/flow2.png", import.meta.url),

  },
  {
    name:'智能推荐',
    count:'智能推荐，提高融资效率',
    src: new URL("@/assets/img/flow/flow3.png", import.meta.url),

  },
  {
    name:'等待审核',
    count:'等待银行受理审核',
    src: new URL("@/assets/img/flow/flow4.png", import.meta.url),

  },

]




export {
  tabList,
  flowList

}