import Vue from 'vue'
import Vuelidate from 'vuelidate'
import {store} from './store'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
