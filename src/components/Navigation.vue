<template>
  <div class="navigation">
    <Controls />

    <transition name="view-fade">
      <div class="view" v-if="navigating">
        <div class="layout">
          <template v-for="({ name, tiles }, i) in tileGroups">
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
import IconButton from './IconButton'
import Controls from './NavigationControls'
import Tile from './Tile'
import StickerAppear from './StickerAppear'

import tilesData from '../animations/tiles-compilation'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Navigation',

  data () {
    return {
      tileGroups: tilesData.groups,
      flag: false
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
    }),
    test () {
      console.log('test')
    }
  },

  components: {
    IconButton,
    Tile,
    StickerAppear,
    Controls
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
    perspective: 1000px
    overflow-x: hidden
    overflow: auto
    color: #3E92CC
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
