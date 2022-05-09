import { AbstractAnimation } from './animation-abstract';
import { AnimationWeb } from './animation-web';
import { AnimationCss } from './animation-css';

const supportsWebAnimations = (): boolean => (typeof (AnimationEffect as any) === 'function' || typeof (window as any).AnimationEffect === 'function') &&
  (typeof (Element as any) === 'function') && (typeof (Element as any).prototype.animate === 'function');

export const createAnimation = (animationId?: string): AbstractAnimation => (
  supportsWebAnimations()
    ? new AnimationWeb(animationId)
    : new AnimationCss(animationId)
);
