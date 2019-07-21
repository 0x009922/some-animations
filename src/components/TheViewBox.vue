<template>
  <div class="view-box">
    <router-view
      class="router"
      v-show="!resizing"
      :class="{ blured: navigating }"
    />
    <div
      class="resizing-stub"
      v-if="resizing"
    >
      RESIZING
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheViewBox',

  computed: {
    ...mapState(['navigating', 'resizing', 'paused'])
  }
}
</script>

<style lang="sass">
@import '../assets/sass/style'

.view-box
  // border: 2px solid white
  height: 100vh
  overflow: hidden

.resizing-stub
  @include stretch
  @include center-box
  color: white
  font-size: 4em
  font-weight: bold
  text-shadow: 5px 5px gray
  // font-style: italic
  

.router
  // overflow: hidden
  transition: filter .3s ease
  &.blured
    filter: blur(13px)
</style>
