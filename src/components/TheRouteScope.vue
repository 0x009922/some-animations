<script>
export default {
    name: 'TheRouteScope',
};
</script>

<template>
    <div class="the-route-scope">
        <router-view :key="$route.path" />
    </div>
</template>

<style lang="sass">
.the-route-scope
  height: 100vh
  position: relative
  overflow: hidden
</style>
