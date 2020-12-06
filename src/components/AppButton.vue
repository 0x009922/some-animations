<script>
import { mergeData } from 'vue-functional-data-merge';

export default {
    name: 'AppButton',
    functional: true,
    render(h, context) {
        return h(
            'div',
            mergeData(context.data, {
                staticClass: 'app-button',
            }),
            context.children,
        );
    },
};
</script>

<style lang="sass">
@use '../assets/sass/const'
@use '../assets/sass/easings'

.app-button
  border: none
  background: const.$primary
  color: const.$background
  padding: 10px
  font-size: 1em
  cursor: pointer
  transition: transform .15s easings.$ease-out-back
  &:focus
    outline: none
  &:hover
    opacity: 0.9
  &:active
    transform: scale(0.95)
</style>
