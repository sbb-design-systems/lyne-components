import { isServer } from 'lit';

export function isZeroAnimationDuration(element: HTMLElement, cssVariableName: string): boolean {
  // Currently on WebKit there is a problem where the animation duration
  // can for some reason not be 0, even though the animation is disabled.
  // Due to this we added a global flag to disable animations in tests.
  if (isServer || (globalThis as { disableAnimation?: boolean }).disableAnimation) {
    return true;
  }
  const animationDuration = getComputedStyle(element).getPropertyValue(cssVariableName);

  return parseFloat(animationDuration) === 0;
}
