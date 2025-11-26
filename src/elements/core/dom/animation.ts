import { isServer } from 'lit';

export function isZeroAnimationDuration(element: HTMLElement, cssVariableName: string): boolean {
  if (isServer) {
    return true;
  }
  const animationDuration = getComputedStyle(element).getPropertyValue(cssVariableName);

  return (
    parseFloat(animationDuration) === 0 ||
    // Currently on WebKit there is a problem where the animation duration
    // can for some reason not be 0, even though the animation is disabled.
    !!element
      .closest('.sbb-disable-animation,.sbb-enable-animation')
      ?.classList.contains('sbb-disable-animation')
  );
}
