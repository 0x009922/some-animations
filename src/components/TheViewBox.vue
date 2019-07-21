<template>
  <div class="view-box" :class="{ blured: navigating }">
    <div
      class="view"
      v-show="!resizing"
      @dblclick="paused ? play() : pause()"
    >
      <transition
        name="route-trans"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>
    <div class="state-stub" v-if="resizing">
      RESIZING
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'TheViewBox',

  computed: {
    ...mapState(['navigating', 'resizing', 'paused'])
  },

  methods: {
    ...mapMutations(['pause', 'play'])
  }
}
</script>

<style lang="sass">
@import '../assets/sass/style'

.view-box
  height: 100vh
  overflow: hidden
  transition: filter .5s ease
  &.blured
    filter: blur(13px)
  .view
    perspective: 1000px
    height: 100%
.state-stub
  @include stretch
  @include center-box
  color: white
  font-size: 4em
  font-weight: bold
  // span.resizing
  //   text-shadow: 5px 5px gray
  span.paused
    cursor: pointer
    background: black
    border: 2px solid white
    padding: 10px
    line-height: 1em
.route-trans-enter-active
  transition: all .6s .5s ease
.route-trans-leave-active
  transition: all 1s ease
.route-trans-enter
  opacity: 0
.route-trans-leave
  // clip-path: circle(150% at 50% 50%)
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)
.route-trans-leave-to
  opacity: 0.3
  // clip-path: circle(0% at 50% 50%)
  clip-path: polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)
  transform: translateZ(-50px)  
</style>
