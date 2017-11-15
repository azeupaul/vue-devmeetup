
import Vue from 'vue'

import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert'

Vue.use(Vuetify)
Vue.component('app-alert', AlertCmp)

Vue.config.productionTip = false

Vue.filter('date', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCbp0pwBFTvhdhloxUMbsBKOEFVdecAIBw',
      authDomain: 'devmeetup-tuto.firebaseapp.com',
      databaseURL: 'https://devmeetup-tuto.firebaseio.com',
      projectId: '',
      storageBucket: 'devmeetup-tuto.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
      }
    })
    // this.$store.dispatch('loadedMeetups')
  }
})
