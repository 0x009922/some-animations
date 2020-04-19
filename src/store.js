import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * Размер окна
     * @type {{ width: number, height: number }}
     */
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },

    /**
     * Функция-петля, которая вызывается в анимационном фрейме
     * @type {Function}
     */
    loop: null,

    /**
     * Ошибка, случившаяся в петле
     * @type {Error}
     */
    loopError: null,

    /**
     * Остановлен ли анимационный цикл
     */
    isPaused: false,

    /**
     * Происходит ли смена размеров окна
     */
    isResizing: false,

    /**
     * Открыто ли меню навигации
     */
    isNavigating: false,
  },
  getters: {
    loopPlaying: (state) => (
      !state.isPaused
      && !state.isResizing
      && !state.isNavigating
      && typeof state.loop === 'function'
    ),
  },
  mutations: {
    updateViewport(state) {
      state.viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    resizing(state) {
      state.isResizing = true;
    },
    resizingDone(state) {
      state.isResizing = false;
    },

    setLoop(state, func) {
      state.loop = func;
    },
    clearLoop(state) {
      state.loop = null;
    },
    loopErrorOccured(state, error) {
      state.isPaused = true;
      state.loopError = error;
    },

    resume(state) {
      if (!state.isResizing) {
        state.isPaused = false;
        state.loopError = null;
      }
    },
    pause(state) {
      if (!state.isResizing) {
        state.isPaused = true;
      }
    },

    showNavigation(state) {
      state.isNavigating = true;
    },
    hideNavigation(state) {
      state.isNavigating = false;
    },
    toggleNavigation(state) {
      state.isNavigating = !state.isNavigating;
    },
  },
  strict: process.env.NODE_ENV !== 'production',
});
