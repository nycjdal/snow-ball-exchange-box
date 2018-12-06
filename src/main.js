// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, message, Modal} from 'ant-design-vue'
import { client } from 'ontology-dapi'

import HelloWorld from './components/HelloWorld'
// import { Script } from 'vm';
// import {} from 'ontology-ts-sdk'
// import HelloWorld from '@/components/HelloWorld'

client.registerClient({})

Vue.config.productionTip = false

Vue.component(Button.name, Button)
Vue.component(Modal.name, Modal)

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$success = Modal.success
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

// var name = HelloWorld.name
// console.log('111111111111111111111111111111111111111111111111111111111111111 => ' + name)
// var tmp = HelloWorld.data()
// var tmp1 = JSON.stringify(tmp)
// console.log('222222222222222222222222222222222222222222222222222222222222222 => ' + tmp1 )
// var tmp2 = HelloWorld.methods.queryName()
// console.log('33333333 => ' + tmp2)

// export default {
//   name: 'datasname',
//   data () {
//     return {
//       data()
//     }
//   }
// }
