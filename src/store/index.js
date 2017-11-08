import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        id: 'meetup-new-york',
        date: '2017-11-9',
        title: 'Meetup in New York',
        location: 'New York',
        description: 'Awesome meetup in New York at TimeSquare Garden.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg'
      },
      {
        id: 'meetup-paris',
        date: '2017-11-10',
        title: 'Meetup in Paris',
        location: 'Paris',
        description: 'Great meetup!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/01_vue_Paris_depuis_Notre-Dame.jpg'
      }
    ],
    user: [
      {
        id: 'user-1',
        registeredMeetups: ['meetup-new-york']
      }
    ]
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        id: 'new-meetup',
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date
      }

      commit('createMeetup', meetup)
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featureMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
})
