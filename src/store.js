import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* eslint-disable eqeqeq */

function debouncer () {
  let timer
  return (func, delay) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func()
      timer = null
    }, delay)
  }
}

let someDebouncer = debouncer()

export default new Vuex.Store({
  state: {
    viewport: null,
    loop: null,
    paused: false,
    processing: false,
    resizing: false,
    navigating: false
  },
  getters: {
    loopPlaying: state => {
      return (
        !state.paused &&
        !state.resizing &&
        !state.navigating &&
        typeof state.loop === 'function'
      )
    }
  },
  mutations: {
    setViewport (state, { width, height }) {
      state.viewport = { width, height }
      console.log('New viewport', width, height)
    },
    resizing (state) {
      state.resizing = true
    },
    endResizing (state) {
      state.resizing = false
    },
    setLoop (state, func) {
      state.loop = func
    },
    removeLoop (state) {
      state.loop = null
    },
    play (state) {
      if (state.resizing) return
      state.paused = false
    },
    pause (state) {
      if (state.resizing) return
      state.paused = true
    },
    showNavigation (state) {
      state.navigating = true
    },
    hideNavigation (state) {
      state.navigating = false
      console.log('hided')
    }
  },
  actions: {
    resized ({ commit }, { width, height }) {
      commit('resizing')
      someDebouncer(() => {
        commit('setViewport', { width, height })
        commit('endResizing')
      }, 800)
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
