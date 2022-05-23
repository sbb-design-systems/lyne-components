import { AnimationBuilder } from '../../global/core/components/animations/animation-interface';

export interface InterfaceLyneToastAttributes {
  verticalPosition: 'top' | 'bottom';
  horizontalPosition: 'left' | 'center' | 'right' | 'start' | 'end';
  politeness: 'off' | 'assertive' | 'polite';
}

type InterfaceToastType = 'link' | 'action' | 'icon';

interface InterfaceToastCommonAction {
  type: InterfaceToastType;
  role: 'cancel' | string;
  cssClass?: string | string[];
}

export interface InterfaceToastLink extends InterfaceToastCommonAction {
  type: 'link';
  label: string;
  href: string;
}

export interface InterfaceToastAction extends InterfaceToastCommonAction {
  type: 'action';
  label: string;
  handler: () => void;
}

export interface InterfaceToastIcon extends InterfaceToastCommonAction {
  type: 'icon';
  role: 'cancel';
}

export interface InterfaceToastConfiguration {
  message: string;
  timeout?: number;
  icon?: string | HTMLElement;
  iconTemplate?: string;
  action?: InterfaceToastLink | InterfaceToastAction | InterfaceToastIcon;
  verticalPosition?: InterfaceLyneToastAttributes['verticalPosition'];
  horizontalPosition?: InterfaceLyneToastAttributes['horizontalPosition'];
  politeness?: InterfaceLyneToastAttributes['politeness'];
}

export interface InterfaceToastConfigurationController {
  config: InterfaceToastConfiguration;
  id?: string;
  keyboardClose?: boolean;
  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
}
