<script>
export default {
  name: 'Tile',
  functional: true,
  props: {
    name: String,
    path: String
  },
  render (h, ctx) {
    let { name, path } = ctx.props
    let { $store, $router } = ctx.parent

    return h('div', {
      class: 'tile',
      on: {
        click () {
          $store.commit('hideNavigation')
          $router.push(path)
        }
      }
    }, name)
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/sass/style'

.tile
  cursor: pointer
  width: 250px
  height: 150px
  background: fade-out($tile-back, 0.5)
  color: $tile-fore
  font-size: 1.5em
  transition: all .27s ease
  padding: 20px
  &:hover
    background: $tile-back
    transform: translateZ(30px)
</style>
