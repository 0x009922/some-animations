import { ref } from 'vue';
import { debounce } from 'debounce';

export default function useViewport() {
    const width = ref(0);
    const height = ref(0);

    const isResizing = ref(false);

    function update() {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    }

    const debouncedReaction = debounce(() => {
        isResizing.value = false;
        update();
    }, 600);

    window.addEventListener('resize', () => {
        isResizing.value = true;
        debouncedReaction();
    });

    update();

    return {
        width,
        height,
        isResizing,
    };
}
