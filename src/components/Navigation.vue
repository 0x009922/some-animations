<template>
  <div class="navigation-mask">
    <div class="collapse-controller">
      NAV
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',

  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="sass" scoped>

.navigation-mask
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  pointer-events: none
  .collapse-controller
    position: fixed
    top: 0
    right: 0
    margin: 20px
    border: 1px solid black
    color: blue
    display: flex
    align-items: center
    justify-content: center
    padding: 10px
    font-size: 1.5em
    pointer-events: auto
    cursor: pointer
</style>
