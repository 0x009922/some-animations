<script>
import { mergeData } from 'vue-functional-data-merge';

export default {
  name: 'AppIcon',
  functional: true,
  props: {
    size: {
      type: [String, Number],
      default: 20,
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  render(h, context) {
    const [{ text: iconName }] = context.children;

    if (typeof iconName !== 'string') {
      console.warn('[app-icon] Content is not a string!');
    }

    const size = `${context.props.size}px`;

    return h('span', mergeData(context.data, {
      class: [
        'app-icon',
        `app-icon--${context.props.color}`,
        'mdi',
        `mdi-${iconName.trim()}`,
      ],
      style: {
        fontSize: size,
      },
    }));
  },
};
</script>

<style lang="sass">
@use '@/assets/sass/const'

@mixin path-color($color)
  color: $color

.app-icon
  line-height: 1em
  &--primary
    @include path-color(const.$primary)
  &--dark
    @include path-color(const.$text-primary)
  &--light
    @include path-color(const.$background)
</style>
