<template>
  <div class="home-layout" v-spray>
    <div class="content-wrapper">
      <h1>Animations</h1>
      <button @click="$store.commit('showNavigation')">
        Open list of animations
      </button>
    </div>
  </div>
</template>

<script>
import spray from '../directives/spray';

export default {
  name: 'Home',
  directives: { spray },
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/style'

.home-layout
  display: flex
  align-items: center
  justify-content: center
  color: $fore
  background: $back
  height: 100%
  h1
    font-weight: normal
    font-size: 5em
  button
    border: none
    background: $tile-back
    color: $tile-fore
    padding: 10px
    font-size: 1em
    cursor: pointer
    &:focus
      outline: none
    &:hover
      opacity: 0.8
</style>
