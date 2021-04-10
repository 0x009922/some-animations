import { Component, FunctionalComponent, h } from 'vue';
import { ThreeAnimationComponent, ThreeAnimationFactory } from '~/modules/simple-three-setup';

export function threeComponentFactory(fn: () => Promise<{ default: ThreeAnimationFactory }>): Component {
    return async () => {
        const { default: factory } = await fn();

        const component: FunctionalComponent = () => h(ThreeAnimationComponent, { factory });
        component.displayName = 'ThreeComponentFactory';

        return component;
    };
}
