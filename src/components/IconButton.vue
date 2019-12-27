<script>
export default {
  functional: true,

  render(createElement, context) {
    const { icon } = context.props;

    const content = icon && icon.name
      ? [createElement('v-icon', { props: icon })]
      : null;

    return createElement('button', context.data, content);
  },
};
</script>
