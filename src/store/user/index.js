import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  actions: {
    registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('registerUserForMeetup', {
        meetupId: payload.meetupId
      })
      commit('setLoading', false)
    },
    unregisterUserFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('unregisterUserFromMeetup', {
        meetupId: payload.meetupId
      })
      commit('setLoading', false)
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
    },
    autoSignin ({commit}, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [] })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const meetupId = payload.meetupId
      if (state.user.registeredMeetups.findIndex(id => id === meetupId) >= 0) {
        return
      }
      state.user.registeredMeetups.push(meetupId)
    },
    unregisterUserFromMeetup (state, payload) {
      const meetupId = payload.meetupId
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(id => id === meetupId), 1)
    },
    setUser (state, user) {
      state.user = user
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
