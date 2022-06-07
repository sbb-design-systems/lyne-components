import { toastAnimation } from './lyne-toast.common-ani';
import { InterfaceAnimation } from '../../../global/core/components/animations/animation-interface';

export const toastLeaveAnimation = (baseEl: HTMLElement): InterfaceAnimation => toastAnimation(baseEl, 0.99, 0);
