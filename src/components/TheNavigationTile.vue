<template>
    <router-link #default="{ navigate, isExactActive }" :to="to">
        <div
            v-sparks="'dark'"
            class="the-navigation-tile"
            :class="{
                'the-navigation-tile--active': isExactActive,
            }"
            @click="isExactActive ? hideNavigation() : navigate($event)"
        >
            {{ animation.tile }}
        </div>
    </router-link>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'TheNavigationTile',
    props: {
        // Информация об анимации. Объект из списка анимаций '@/animations'
        animation: {
            type: Object,
            required: true,
        },
    },
    computed: {
        to() {
            const { route } = this.animation;
            return route.name ? { name: route.name } : route.path;
        },
    },
    methods: {
        ...mapMutations(['hideNavigation']),
    },
};
</script>

<style lang="sass" scoped>
@use '@/assets/sass/const'
@use '@/assets/sass/easings'

.the-navigation-tile
  cursor: pointer
  width: 200px
  height: 90px
  background: const.$background
  color: const.$text-primary
  font-size: 1.2em
  padding: 12px
  transition: transform .3s easings.$ease-out-back
  position: relative

  &:active
    transform: scale(0.98)

  &--active
    background: const.$primary
    color: const.$background
</style>
