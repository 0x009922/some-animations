<template>
  <div class="navigation" v-spray>
    <Controls />

    <transition name="view-fade">
      <div class="view" v-if="navigating">
        <div class="layout">
          <template v-for="({ name, tiles }, i) in groups">
            <h2
              :key="i + 'n'"
              class="group-name"
              v-text="name"
            />
            <StickerAppear
              v-for="(bind, j) in tiles"
              :key="i + 'app' + j"
              :delay="Math.random() * 0.2"
              duration=".4"
            >
              <Tile
                class="tile"
                v-bind="bind"
              />
            </StickerAppear>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Controls from './NavigationControls'
import Tile from './Tile'
import StickerAppear from './StickerAppear'
import animations from '../animations'
import { mapState, mapMutations } from 'vuex'
import spray from '@/directives/spray'

export default {
  name: 'Navigation',
  data () {
    return {
      flag: false
    }
  },
  computed: {
    ...mapState(['paused', 'navigating']),
    groups () {
      return [
        {
          name: 'Three',
          tiles: animations.three
        },
        {
          name: 'Canvas',
          tiles: animations.canvas
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['play', 'pause']),
    ...mapMutations({
      show: 'showNavigation',
      hide: 'hideNavigation'
    }),
    test () {
      console.log('test')
    }
  },
  components: {
    Tile,
    StickerAppear,
    Controls
  },
  directives: {
    spray
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/sass/style'

.navigation
  @include stretch
  pointer-events: none
  & > *
    pointer-events: auto
    // pointer-events: auto
  .view
    @include stretch
    z-index: 1
    padding: 50px 20px
    perspective: 2000px
    overflow-x: hidden
    overflow: auto
    background: $nav-back
    color: $nav-fore
    // border: 2px dashed white
    &::-webkit-scrollbar
      width: 0
      // width: 0 !important
      // display: none
    .layout
      // border: 2px dashed green
      .group-name
        grid-column-start: 1
        grid-column-end: -1
        font-weight: normal
        margin: 0
        font-size: 2em
        margin-bottom: 30px
      * + .group-name
        margin-top: 30px
      display: grid
      justify-content: center
      align-content: start
      grid-template-columns: repeat(auto-fit, 250px)
      grid-gap: 20px
      // width: 300px
      // height: 200px
      // background: white
.view-fade-enter-active,
.view-fade-leave-active
  transition: opacity .3s ease
.view-fade-enter,
.view-fade-leave-to
  opacity: 0
</style>
