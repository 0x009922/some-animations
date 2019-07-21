<script>
export default {
  functional: true,

  render (createElement, context) {
    let size = context.props.size || 45
    let icon = context.props.icon

    let content = icon && icon.name
      ? [createElement('v-icon', { props: icon })]
      : null

    return createElement('button', {
      ...context.data,
      class: [
        'icon-button',
        context.data.staticClass
      ],
      style: {
        width: `${size}px`,
        height: `${size}px`
      }
    }, content)
  }
}
</script>

<style lang="sass" scoped>
.icon-button
  display: flex
  align-items: center
  justify-content: center
  border: none
  // background: blue
  border-radius: 50%
  cursor: pointer
  &:focus
    outline: none
  &:disabled
    opacity: 0.4
    pointer-events: none
  &:active
    opacity: 0.7
</style>

