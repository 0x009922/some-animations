import { Component } from 'vue';

export type AnimationCategory = 'three' | 'canvas' | 'other';

export interface AnimationDefinition {
    name: string;
    summary: string;
    componentLoader: () => Promise<Component>;
    category?: AnimationCategory;
}

export function defineAnimation(v: AnimationDefinition): AnimationDefinition {
    return v;
}
