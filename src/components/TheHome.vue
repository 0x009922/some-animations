<template>
  <div
    v-sparks="'dark'"
    class="the-home d-flex align-center justify-center"
  >
    <div>
      <h1>Animations</h1>

      <div class="d-flex flex-column align-start">
        <app-button @click="$store.commit('showNavigation')">
          Открыть список
        </app-button>

        <a href="https://github.com/LiquidSolid/some-animations">
          <app-button class="mt-2 d-flex align-end">
            <app-icon
              color="light"
              class="mr-2"
            >
              {{ mdiGithub }}
            </app-icon>

            Github
          </app-button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiGithub } from '@mdi/js';

import AppIcon from './AppIcon';
import AppButton from './AppButton';

export default {
  name: 'Home',
  components: { AppIcon, AppButton },
  data: () => ({
    mdiGithub,
  }),
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
  a
    text-decoration: none

</style>
