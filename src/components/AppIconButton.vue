<script>
import { mergeData } from 'vue-functional-data-merge';

export default {
  name: 'AppIconButton',
  functional: true,
  props: {
    size: {
      type: [String, Number],
      default: 20,
    },
    light: {
      type: Boolean,
      default: false,
    },
  },
  render(h, context) {
    const [{ text: path }] = context.children;

    if (typeof path !== 'string') {
      console.warn('[app-icon-button] Content is not a string!');
    }

    return h('div', mergeData(context.data, {
      staticClass: 'app-icon-button',
      class: {
        'app-icon-button--light': context.props.light,
      },
      directives: [{
        name: 'sparks',
        value: context.props.light ? 'light' : 'primary',
      }],
    }), [
      h('svg', {
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: context.props.size,
          height: context.props.size,
        },
      }, [
        h('path', {
          attrs: { d: path },
        }),
      ]),
    ]);
  },
};
</script>

<style lang="sass">
@import '@/assets/sass/style'

@mixin theme($color)
  border-color: $color
  path
    stroke: $color
    fill: $color
  &:hover
    background: transparentize($color, 0.75)

.app-icon-button
  @include theme($primary)

  border-width: 2px
  border-style: solid
  border-radius: 50%
  background: transparent
  display: flex
  align-items: center
  justify-content: center
  width: 44px
  height: 44px
  cursor: pointer
  transition: transform .15s $ease-out-back
  &:focus
    outline: none
  &:active
    transform: scale(0.9)

  path
    stroke: $primary
    fill: $primary

  &--light
    @include theme($background)
</style>
