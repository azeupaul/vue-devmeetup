export default {
  state: {
    loading: false,
    error: null
  },
  actions: {
    clearError ({commit}) {
      commit('clearError')
    }
  },
  mutations: {
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    },
    setLoadedMeetups (state, payload) {
      state.meetups = payload
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
