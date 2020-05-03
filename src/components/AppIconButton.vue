<script>
import { mergeData } from 'vue-functional-data-merge';
import Icon from './AppIcon';

export default {
  name: 'AppIconButton',
  functional: true,
  props: {
    size: {
      type: [String, Number],
      default: 20,
    },
  },
  render(h, context) {
    return h('div', mergeData(context.data, {
      staticClass: 'app-icon-button',
      class: {
        'app-icon-button--light': context.props.light,
      },
      directives: [{
        name: 'sparks',
        value: 'primary',
      }],
    }), [
      h(Icon, {
        props: {
          size: context.props.size,
          color: 'primary',
        },
      }, context.children),
    ]);
  },
};
</script>

<style lang="sass">
@use '@/assets/sass/const'
@use '@/assets/sass/easings'

.app-icon-button
  border-width: 2px
  border-style: solid
  border-radius: 50%
  border-color: const.$primary
  background: transparent
  display: flex
  align-items: center
  justify-content: center
  $size: 40px
  width: $size
  height: $size
  cursor: pointer
  transition: transform .15s easings.$ease-out-back
  &:focus
    outline: none
  &:active
    transform: scale(0.9)
  &:hover
    opacity: 0.9
</style>
