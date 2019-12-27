<template>
  <div>
    <canvas
      ref="target"
      :width="viewport.width"
      :height="viewport.height"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

let animation = null;

export default {
  name: 'First',
  props: {
    AnimationClass: {
      required: true,
    },
  },
  computed: {
    ...mapState(['viewport']),
  },
  watch: {
    viewport(value) {
      animation.setSize(value);
    },
  },
  mounted() {
    animation = new this.AnimationClass(this.$refs.target);
    animation.setSize(this.viewport);
    this.$store.commit('setLoop', animation.animate.bind(animation));
  },
  beforeDestroy() {
    this.$store.commit('removeLoop');
    animation.destroy();
  },
};
</script>
