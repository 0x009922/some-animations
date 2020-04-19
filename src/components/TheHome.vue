<template>
  <div
    v-sparks="'dark'"
    class="the-home d-flex align-center justify-center"
  >
    <div>
      <h1>Animations</h1>

      <button @click="$store.commit('showNavigation')">
        Открыть список
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="sass" scoped>
@import '../assets/sass/style'

.the-home
  color: $primary
  background: $background
  height: 100%
  h1
    font-weight: normal
    font-size: 5em
    margin-bottom: 16px
  button
    border: none
    background: $primary
    color: $background
    padding: 10px
    font-size: 1em
    cursor: pointer
    &:focus
      outline: none
    &:hover
      opacity: 0.9
</style>
