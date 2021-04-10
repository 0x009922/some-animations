import { Component } from 'vue';

export type AnimationCategory = 'three' | 'canvas' | 'other';

export interface AnimationDefinition {
    name: string;
    summary: string;
    component: Component;
    category?: AnimationCategory;

    // /**
    //  * Номер анимации?
    //  */
    // num?: number;
}

export function defineAnimation(v: AnimationDefinition): AnimationDefinition {
    return v;
}
