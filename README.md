## 小程序

2022 年 11 月 23 日 ： 目前先不考虑 H5， 仅考虑小程序的版本

图片:

小程序不支持拼接相对路径的图片， 所以 uni-app 中，必须使用全路径图片， 或者网络路径图片， 不得使用 ./ 的形式拼接的图片 -- 尤其是使用 image 组件的时候

### 项目架构

整体使用 vite+ts 的方式来开发和构建 ( uni-app@3 )

小程序特性， 没有路由，没有 views 目录（改为 pages 目录）

关于 store， 各个页面之间可以保持数据， 可以正常使用

### storage

```js
import { useStore as useLocalData } from '@stores/local'
const localData = useLocalData()
/**
 * 经过验证， 小程序环境下，执行一万次uni.getStorageSync 和 store.xxx来获取某个值，时间差近千倍
 * 所以： 尽量用自己的缓存， storage只用来持久化
 *
 * 一个是效率问题， 第二个， 对于业务程序来说，可以隐藏实现细节
 *  store 可以用本地存储， 在H5端也可以用sessionStorage/indexDB 等形式来做存储，甚至可以用服务端做持久化存储
 */
let arr = new Array(10000)
arr.fill(1)
let start = Date.now()
let token = null
arr.forEach(() => {
  token = uni.getStorageSync('token')
})
let end = Date.now()
console.log(`spent time ${end - start}`)
start = Date.now()
arr.forEach(() => {
  token = localData.token
})
end = Date.now()
console.log(`spent time local ${end - start}`)
```

#### 关于 request

使用 uni.request， 暂时不考虑使用 axios， 对于业务来说， 这应该是不可感知的， 不影响

将每个接口封装成异步函数，尽量保留接口的详细信息 -- url 与返回值的对应关系

直接调用函数，业务中处理参数和响应值就行

### 页面布局

在 assets/base.scss 中， 给 page 加上了样式： page{height:100vh;width:100vw}， 每个页面会自动撑满

后续布局请在此基础上进行， 可以直接使用 flex 进行自适应， 并且支持 contain:size 的方式来控制 flex 内容不至于将容器撑大， 内容布局的时候尽量不要使用 calc(100vh - Nrpx) 的方式来做了

### UI 组件

项目组件使用 [uview plus](https://uiadmin.net/uview-plus/components/intro.html)， 基于 uview2 的社区版本，支持 uniapp@3 和 vue@3

### 分包

跟主业务无关的页面， 都扔到 subpackage-page 下面去， 避免主包体积过大
