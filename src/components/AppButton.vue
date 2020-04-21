<script>
import { mergeData } from 'vue-functional-data-merge';

export default {
  name: 'AppButton',
  functional: true,
  render(h, context) {
    return h('div', mergeData(context.data, {
      staticClass: 'app-button',
    }), context.children);
  },
};
</script>

<style lang="sass">
@import '../assets/sass/const'
@import '../assets/sass/easings'

.app-button
  border: none
  background: $primary
  color: $background
  padding: 10px
  font-size: 1em
  cursor: pointer
  transition: transform .15s $ease-out-back
  &:focus
    outline: none
  &:hover
    opacity: 0.9
  &:active
    transform: scale(0.95)
</style>
