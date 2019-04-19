// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import Vuelidate from 'vuelidate'
import ToggleButton from 'vue-js-toggle-button'
import VueCoreImageUpload from 'vue-core-image-upload'
import axios from 'axios'
// Sync store with router

Vue.use(ToggleButton)
Vue.use(Vuelidate)
Vue.use(VueCoreImageUpload)
sync(store, router)
axios.defaults.withCredentials = true
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://localhost:8080/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  data: function () {
    return {
      isAdmin: false
    }
  },
  store,
  render: h => h(App)
}).$mount('#app')
