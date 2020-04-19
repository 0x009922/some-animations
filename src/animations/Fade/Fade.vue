<template>
  <div class="fade-layout">
    <div class="canvas-wrapper">
      <canvas
        ref="target"
        width="1000"
        height="1000"
      />
    </div>
  </div>
</template>

<script>
import Scene from './Scene';

export default {
  name: 'Fade',
  mounted() {
    const scene = new Scene(this.$refs.target);
    this.$store.commit('setLoop', scene.render.bind(scene));
  },
  beforeDestroy() {
    this.$store.commit('clearLoop');
  },
};
</script>

<style lang="sass" scoped>
.fade-layout
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  background: rgb(240, 240, 240)
  .canvas-wrapper
    // border: 2px dashed teal
    canvas
      width: 700px
      height: 700px
      display: block
</style>
