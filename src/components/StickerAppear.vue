<script>
export default {
  name: 'StickerAppear',
  functional: true,
  render (h, context) {
    let delay = parseFloat(context.props.delay) || 0
    let duration = parseFloat(context.props.duration) || 0

    let data = {
      props: {
        duration: {
          enter: (delay + duration) * 1000,
          leave: 0
        },
        appear: true,
        appearClass: 'sticker-appear'
      },
      on: {
        beforeAppear (el) {
          el.style.transition = `all ${duration}s ${delay}s ease`
        },
        afterAppear (el) {
          el.style.transition = ''
        }
      }
    }

    return h('transition', data, context.children)
  }
}
</script>

<style lang="sass" scoped>
.sticker-appear
  transform-origin: 50% 0%
  transform: translateZ(50px) rotateX(15deg)
  opacity: 0
</style>

