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
.tile
  cursor: pointer
  width: 250px
  height: 150px
  background: #BCCCE0
  color: #3B3561
  font-size: 1.5em
  transition: all .27s ease
  padding: 20px
  opacity: 0.5
  &:hover
    opacity: 1
    transform: translateZ(30px)
</style>
