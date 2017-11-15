
import Vue from 'vue'

import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'

Vue.use(Vuetify)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)

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
