import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// Vue全局使用Router
Vue.use(Router)

export default new Router({
  routes: [// 配置路由，使用数组形式
    {
      path: '/', // 链接路径
      name: 'HelloWorld', // 路由名称
      component: HelloWorld // 映射的组件
    }
  ]
})
