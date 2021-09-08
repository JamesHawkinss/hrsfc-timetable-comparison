import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { createStore } from './store/auth'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = createStore();
new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
