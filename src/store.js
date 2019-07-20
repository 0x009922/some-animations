import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* eslint-disable eqeqeq */

export default new Vuex.Store({
  state: {
    viewport: null,
    handlers: [],
    paused: false,
    lastFrame: Date.now(),
    elapsed: 0
  },
  mutations: {
    setViewport (state, { width, height }) {
      state.viewport = { width, height }
      console.log('New viewport', width, height)
    },
    setHandler (state, { key, handler }) {
      let existing = state.handlers.find(x => x.key == key)
      if (existing) {
        existing.handler = handler
      } else {
        state.handlers.push({ key, handler })
      }
    },
    removeHandler (state, key) {
      let index = state.handlers.findIndex(x => x.key == key)
      if (index >= 0) {
        state.handlers.splice(index, 1)
      }
    },
    play (state) {
      state.paused = false
    },
    pause (state) {
      state.paused = true
    },
    updateTimestumps (state) {
      let now = Date.now()
      state.elapsed = now - state.lastFrame
      state.lastFrame = now
    }
  },
  actions: {
    loop ({ commit, dispatch, state }) {
      commit('updateTimestumps')
      if (!state.paused) {
        state.handlers.forEach(x => x.handler())
      }
      window.requestAnimationFrame(() => dispatch('loop'))
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
