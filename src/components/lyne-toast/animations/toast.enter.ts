import { InterfaceAnimation } from '../../../global/core/components/animations/animation-interface';
import { createAnimation } from '../../../global/core/components/animations/animation';

/*
 * FIXME
 */
export const toastEnterAnimation = (baseEl: HTMLElement, position: string): InterfaceAnimation => {
  const baseAnimation = createAnimation();
  const wrapperAnimation = createAnimation();

  const root = baseEl.shadowRoot;
  const wrapperEl = root.querySelector('.toast-wrapper') as HTMLElement;

  /*
   * const bottom = `calc(8px + var(--ion-safe-area-bottom, 0px))`;
   * const top = `calc(8px + var(--ion-safe-area-top, 0px))`;
   */
  const bottom = '160px';
  const top = '160px';

  wrapperAnimation.addElement(wrapperEl);

  switch (position) {
    case 'top':
      wrapperEl.style.top = top;
      wrapperAnimation.fromTo('opacity', 0.01, 1);
      wrapperAnimation.duration(750);
      break;

    default:
      wrapperEl.style.bottom = bottom;
      wrapperAnimation.fromTo('opacity', 0.01, 1);
      wrapperAnimation.duration(750);
      break;
  }

  return baseAnimation
    .easing('cubic-bezier(.36,.66,.04,1)')
    .duration(1500)
    .addAnimation(wrapperAnimation);
};
