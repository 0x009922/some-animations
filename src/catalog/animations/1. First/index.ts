import { threeComponentFactory } from '~/catalog/three-component-factory';
import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'first',
    component: threeComponentFactory(async () => {
        const Animation = await import('./Animation').then((x) => x.default);
        return {
            default: (canvas) => {
                const anim = new Animation(canvas);
                return {
                    animate: anim.animate.bind(anim),
                    setSize: anim.setSize.bind(anim),
                };
            },
        };
    }),
    summary: 'first',
    category: 'three',
});
