<template>
  <div class="navigation-controls"
  >
    <IconButton
      v-if="showPause"
      :icon="{ name: 'pause', scale: 1.3 }"
      class="pause"
      :class="{ active: paused }"
      @click="paused ? play() : pause()"
    />
    <IconButton
      v-if="!navigating"
      :icon="{ name: 'brands/buffer', scale: 1.3 }"
      class="buffer"
      @click="show()"
    />
    <IconButton
      v-if="navigating"
      :icon="{ name: 'times', scale: 1.5 }"
      class="close"
      @click="hide()"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import IconButton from './IconButton';

export default {
  name: 'NavigationControls',

  computed: {
    ...mapState(['paused', 'navigating', 'resizing']),

    showPause() {
      return (
        !this.navigating
        && !this.resizing
      );
    },
  },

  methods: {
    ...mapMutations(['play', 'pause']),
    ...mapMutations({
      show: 'showNavigation',
      hide: 'hideNavigation',
    }),
  },

  components: {
    IconButton,
  },
};
</script>

<style lang="sass">
@import '../assets/sass/style'

@keyframes blinking
  from, to
    opacity: 1
  50%
    opacity: .3

.navigation-controls
  z-index: 2
  position: fixed
  top: 0
  right: 0
  // margin: 20px
  // border: 1px solid white
  color: blue
  display: grid
  grid-template: auto / auto auto
  // grid-gap: 10px
  // border-radius: 55px
  // overflow: hidden
  // background: fade-out(white, 0.8)
  padding: 10px
  font-size: 1.5em
  // &.unobtrusively
  //   opacity: 0.5
  //   &:hover
  //     opacity: 1
  button
    transition: all .25s ease
    // background: transparent
    color: white
    display: flex
    align-items: center
    justify-content: center
    border: none
    width: 55px
    height: 55px
    padding: 0
    background: fade-out(gray, 0.9)
    border-radius: 50%
    cursor: pointer
    &:focus
      outline: none
    &:disabled
      opacity: 0.4
      pointer-events: none
    &:hover
      background: fade-out(gray, 0.8)
  button + button
    margin-left: 10px
  .buffer
    grid-column: 2
    grid-row: 1
  .pause
    grid-column: 1
    grid-row: 1
    &:hover
      animation: none
    &.active
      // opacity: 1
      color: black
      background: white
      // animation: blinking 1s infinite ease
  .close
    // font-family: Monofur
    // font-size: 1.3em
    // line-height: 0.66em
</style>
