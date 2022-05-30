import { InterfaceAnimation } from '../../../global/core/components/animations/animation-interface';
import { createAnimation } from '../../../global/core/components/animations/animation';

export const toastEnterAnimation = (baseEl: HTMLElement, position: string): InterfaceAnimation => {
  const baseAnimation = createAnimation();
  const wrapperAnimation = createAnimation();

  const root = baseEl.shadowRoot;
  const wrapperEl = root.querySelector('.toast-wrapper') as HTMLElement;

  wrapperAnimation.addElement(wrapperEl);

  switch (position) {
    case 'top':
      wrapperAnimation.fromTo('opacity', 0.01, 1);
      wrapperAnimation.duration(750);
      break;

    default:
      wrapperAnimation.fromTo('opacity', 0.01, 1);
      wrapperAnimation.duration(750);
      break;
  }

  return baseAnimation
    .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(1500)
    .addAnimation(wrapperAnimation);
};
