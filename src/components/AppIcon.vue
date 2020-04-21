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
    const [{ text: path }] = context.children;

    if (typeof path !== 'string') {
      console.warn('[app-icon] Content is not a string!');
    }

    return h('svg', mergeData(context.data, {
      staticClass: `app-icon app-icon--${context.props.color}`,
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: context.props.size,
        height: context.props.size,
      },
    }), [
      h('path', {
        attrs: { d: path },
      }),
    ]);
  },
};
</script>

<style lang="sass">
@import '@/assets/sass/style'

@mixin path-color($color)
  path
    stroke: $color
    fill: $color

svg.app-icon
  &--primary
    @include path-color($primary)
  &--dark
    @include path-color($text-primary)
  &--light
    @include path-color($background)
</style>
