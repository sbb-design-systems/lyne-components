import { InterfaceAnimation } from '../../../global/core/components/animations/animation-interface';
import { createAnimation } from '../../../global/core/components/animations/animation';

export const toastLeaveAnimation = (baseEl: HTMLElement): InterfaceAnimation => {
  const root = baseEl.shadowRoot;
  const wrapperEl = root.querySelector('.toast-wrapper') as HTMLElement;
  const computedStyle = window.getComputedStyle(baseEl);
  const animationEasing = computedStyle.getPropertyValue('--animation-easing');

  /** FIXME remove ".replace(..)" when the design-token is fixed */
  const animationDurationBase = computedStyle.getPropertyValue('--animation-duration-6x')
    .replace('ms', '');

  /** FIXME remove ".replace(..)" when the design-token is fixed */
  const animationDurationWrapper = computedStyle.getPropertyValue('--animation-duration-3x')
    .replace('ms', '');

  const wrapperAnimation =
    createAnimation()
      .addElement(wrapperEl)
      .duration(Number(animationDurationWrapper))
      .fromTo('opacity', 0.99, 0);

  return createAnimation()
    .easing(animationEasing)
    .duration(Number(animationDurationBase))
    .addAnimation(wrapperAnimation);
};
