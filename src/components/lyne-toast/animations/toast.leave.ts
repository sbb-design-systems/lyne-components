import { InterfaceAnimation } from '../../../global/core/components/animations/animation-interface';
import { createAnimation } from '../../../global/core/components/animations/animation';

export const toastLeaveAnimation = (baseEl: HTMLElement): InterfaceAnimation => {
  const baseAnimation = createAnimation();
  const wrapperAnimation = createAnimation();

  const root = baseEl.shadowRoot;
  const wrapperEl = root.querySelector('.toast-wrapper') as HTMLElement;

  wrapperAnimation
    .addElement(wrapperEl)
    .duration(750)
    .fromTo('opacity', 0.99, 0);

  return baseAnimation
    .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(1500)
    .addAnimation(wrapperAnimation);
};
