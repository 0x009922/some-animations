<template>
    <div class="never-ending-fun d-flex align-center justify-center">
        <canvas ref="target" />
    </div>
</template>

<script>
import Animation from './Animation';

export default {
    name: 'NeverEndingFun',
    mounted() {
        const animation = new Animation(this.$refs.target);
        this.$store.commit('setLoop', animation.animate.bind(animation));
    },
    beforeDestroy() {
        this.$store.commit('clearLoop');
    },
};
</script>

<style lang="sass" scoped>
.never-ending-fun
  height: 100%
  background: black
</style>
