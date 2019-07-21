<template>
  <div class="navigation">
    <div class="controls">
      <IconButton
        :icon="{ name: 'asterisk', scale: 2 }"
        size="75"
        @click="navigating ? hide() : show()"
      />
      <IconButton
        :icon="{ name: paused ? 'play' : 'pause', scale: 2 }"
        size="75"
        @click="paused ? play() : pause()"
      />
    </div>

    <div class="view" v-if="navigating">
      <Tile v-for="(n, i) in new Array(9).fill(0)" :key="i">
        <div class="test">
          ^_^
        </div>
      </Tile>
    </div>
  </div>
</template>

<script>
import IconButton from './IconButton'
import Tile from './Tile'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Navigation',

  data () {
    return {
      // show: false
    }
  },

  computed: {
    ...mapState(['paused', 'navigating'])
  },

  methods: {
    ...mapMutations(['play', 'pause']),
    ...mapMutations({
      show: 'showNavigation',
      hide: 'hideNavigation'
    })
  },

  components: {
    IconButton,
    Tile
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/sass/style'

.navigation
  @include stretch
  pointer-events: none
  .controls
    z-index: 2
    position: fixed
    top: 0
    right: 0
    margin: 20px
    border: 1px solid black
    color: blue
    display: grid
    grid-gap: 10px
    padding: 10px
    font-size: 1.5em
    pointer-events: auto
  .view
    @include stretch
    z-index: 1
    margin: 50px
    display: grid
    grid-template-rows: repeat(4, 1fr)
    grid-template-columns: repeat(4, 1fr)
    grid-gap: 25px
    perspective: 1000px
    .test
      display: flex
      align-items: center
      justify-content: center
      font-size: 3.5em
      font-weight: bold
      height: 100%
      // width: 300px
      // height: 200px
      // background: white
</style>
