<script lang="ts">
import { h, resolveComponent } from 'vue';
import factory from './factory';

export default () => h(resolveComponent('ThreeAnimation'), { factory });
</script>
