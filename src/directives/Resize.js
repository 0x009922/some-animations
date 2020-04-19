const resizeListenerSymbol = Symbol('resize-func');

/**
 * Директива, следящая за размерами окна и вызывающая переданный колбек.
 */
export default {
  bind(el, binding) {
    function listener() {
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      if (typeof binding.value === 'function') {
        binding.value(viewport);
      } else {
        console.error('[resize-directive] No callback provided!');
      }
    }

    window.addEventListener('resize', listener);
    el[resizeListenerSymbol] = listener;
  },
  unbind(el) {
    window.removeEventListener(el[resizeListenerSymbol]);
  },
};
