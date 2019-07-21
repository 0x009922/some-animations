<script>
export default {
  functional: true,

  render (createElement, context) {
    let icon = context.props.icon

    let content = icon && icon.name
      ? [createElement('v-icon', { props: icon })]
      : null

    return createElement('button', context.data, content)
  }
}
</script>
