import { AbstractAnimation } from './animation-abstract';
import { AnimationWeb } from './animation-web';
import { AnimationCss } from './animation-css';

const supportsWebAnimations: boolean =
  (typeof (AnimationEffect as any) === 'function' || typeof (window as any).AnimationEffect === 'function') &&
  (typeof (Element as any) === 'function') && (typeof (Element as any).prototype.animate === 'function');

// eslint-disable-next-line @typescript-eslint/naming-convention
const AnimationVariant = supportsWebAnimations
  ? AnimationWeb
  : AnimationCss;

export const createAnimation = (animationId?: string): AbstractAnimation => new AnimationVariant(animationId);
