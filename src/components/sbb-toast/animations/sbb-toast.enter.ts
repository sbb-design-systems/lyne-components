import { toastAnimation } from './sbb-toast.common-ani';
import { InterfaceAnimation } from '../../../global/core/components/animations/animation-interface';

export const toastEnterAnimation = (baseEl: HTMLElement): InterfaceAnimation => toastAnimation(baseEl, 0.01, 1);
