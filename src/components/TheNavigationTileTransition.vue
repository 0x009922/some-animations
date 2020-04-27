<script>
// function resetDelay(el) {
//   el.style.transitionDelay = '0s';
// }

export default {
  name: 'TheNavigationTileTransition',
  functional: true,
  render(h, context) {
    return h('transition', {
      ...context.data,
      props: {
        name: 'tile-transition',
        duration: {
          enter: 400 + 200 + 150 + 10,
          leave: 300 + 150 + 10,
        },
      },
      on: {
        ...context.listeners,
        beforeEnter(el) {
          const delay = 0.2 + Math.random() * 0.15;
          el.style.transitionDelay = `${delay}s`;

          const func = context.listeners['before-enter'];
          func && func(el);
        },
        beforeLeave(el) {
          const delay = Math.random() * 0.15;
          el.style.transitionDelay = `${delay}s`;

          const func = context.listeners['before-leave'];
          func && func(el);
        },
        // afterEnter(el) {
        //   resetDelay(el);

        //   const func = context.listeners['after-enter'];
        //   func && func(el);
        // },
      },
    }, context.children);
  },
};
</script>

<style lang="sass">
@use '@/assets/sass/easings'

.tile-transition
  &-enter-active
    transition-property: transform, opacity
    transition-timing-function: easings.$ease-out-quart
    transition-duration: .4s
  &-leave-active
    transition-property: transform, opacity
    transition-timing-function: easings.$ease-in-quart
    transition-duration: .3s
  &-enter, &-leave-to
    transform: translateY(-30px)
    opacity: 0
</style>
