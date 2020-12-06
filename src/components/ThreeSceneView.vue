<template>
    <div>
        <canvas ref="canvas" :width="viewport.width" :height="viewport.height" />
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ThreeSceneView',
    props: {
        // eslint-disable-next-line vue/prop-name-casing
        AnimationClass: {
            type: Function,
            required: true,
        },
    },
    computed: {
        ...mapState(['viewport']),
    },
    watch: {
        viewport(value) {
            this.animation.setSize(value);
        },
    },
    mounted() {
        this.animation = new this.AnimationClass(this.$refs.canvas);
        this.animation.setSize(this.viewport);
        this.$store.commit('setLoop', this.animation.animate.bind(this.animation));
    },
    beforeDestroy() {
        this.$store.commit('clearLoop');
        this.animation.destroy();
    },
};
</script>
