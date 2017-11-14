import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        id: 'meetup-new-york',
        date: new Date(),
        title: 'Meetup in New York',
        location: 'New York',
        description: 'Awesome meetup in New York at TimeSquare Garden.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg'
      },
      {
        id: 'meetup-paris',
        date: new Date(),
        title: 'Meetup in Paris',
        location: 'Paris',
        description: 'Great meetup!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/01_vue_Paris_depuis_Notre-Dame.jpg'
      }
    ],
    user: null,
    loading: false,
    error: null
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
    },
    registerUser ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error.message)
            console.log(error)
          }
        )
    },
    SignUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error.message)
            console.log(error)
          }
        )
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, user) {
      state.user = user
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
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
    },
    user (state) {
      return state.user
    }
  }
})
