<script lang="ts">
import { h, resolveComponent } from 'vue';
import create from './create';

export default () => h(resolveComponent('ThreeAnimation'), { factory: create });
</script>
