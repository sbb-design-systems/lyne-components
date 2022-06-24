import { InterfaceAnimation } from '../../../global/core/components/animations/animation-interface';
import { createAnimation } from '../../../global/core/components/animations/animation';
import { getAnimationDurationVariableSafeValue } from '../../../global/helpers/get-animation-duration-variable-safe-value';

export const toastAnimation = (
  baseEl: HTMLElement,
  opacityFromValue: number,
  opacityToValue: number
): InterfaceAnimation => {
  const computedStyle: CSSStyleDeclaration = window.getComputedStyle(baseEl);
  const wrapperAnimation: InterfaceAnimation = createAnimation()
    .addElement(baseEl.shadowRoot.querySelector('.toast-wrapper'))
    .fromTo('opacity', opacityFromValue, opacityToValue);

  return createAnimation()
    .easing(computedStyle.getPropertyValue('--sbb-animation-easing'))
    .duration(getAnimationDurationVariableSafeValue(computedStyle, '--sbb-animation-duration-6x'))
    .addAnimation(wrapperAnimation);
};
