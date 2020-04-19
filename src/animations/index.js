const ctx = require.context('./', true, /^\.\/\w+\/index\.js$/);

/**
 * @typedef {{
 * route: import('vue-router').RouteConfig,
 * tile: String,
 * }} AnimationDeclaration
 * @type {AnimationDeclaration[]}
 */
export default ctx.keys().map((val) => ctx(val).default);

/**
 * Настройка тика - функции, которая будет каждый анимационный фрейм
 * вызывать функцию `loop` в хранилище Vuex.
 *
 * @param {import('vuex').Store} store Хранилище Vuex
 * @todo Сделать замедление и ускорение времени. При паузе и вручную
 */
export function setupTicks(store) {
  let lastFrame = window.performance.now();
  let elapsed = 0;
  let frame = null;

  // Запускаю/останавливаю цикл в зависимости от состояния приложения
  store.watch(
    (state, getters) => getters.loopPlaying,
    (val) => {
      if (val) {
        run();
      } else {
        stop();
      }
    },
    { immediate: true },
  );

  /**
   * Запуск цикла
   */
  function run() {
    tick();
  }

  /**
   * Остановка цикла
   */
  function stop() {
    cancelAnimationFrame(frame);
  }

  /**
   * Тик. Самовоспроизводящаяся функция цикла.
   * Считает время и запускает loop в хранилище
   */
  function tick() {
    const now = performance.now();
    const delta = now - lastFrame;
    lastFrame = now;

    if (delta < 300) {
      try {
        elapsed += delta;
        store.state.loop(delta, elapsed);
      } catch (err) {
        console.error('Error in loop:', err);
        store.commit('loopErrorOccured', err);
      }
    }

    frame = requestAnimationFrame(tick);
  }
}
